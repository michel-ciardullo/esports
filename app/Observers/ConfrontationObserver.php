<?php

namespace App\Observers;

use App\Models\Bet;
use App\Models\Confrontation;
use App\Models\Team;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Collection;

class ConfrontationObserver
{
    /**
     * Handle the Confrontation "updated" event.
     *
     * @param Confrontation $confrontation
     * @return void
     */
    public function updated(Confrontation $confrontation)
    {
        if (!in_array($confrontation, [Confrontation::STATUS_LIVE, Confrontation::STATUS_NOT_STARTED]))
        {
            $bets = Bet::where('bets.confrontation_id', '=', $confrontation->id)
                ->select([
                    'bets.*',
                    'tickets.type as ticket_type',
                    'tickets.status as ticket_status',
                ])
                ->leftJoin('tickets', 'tickets.id', '=', 'bets.ticket_id')
                ->where('bets.status', '=', 'active')
                ->where('tickets.status', '=', 'active')
                ->get();

            $bets->each(function ($bet) use($confrontation)
            {
                switch ($confrontation->status)
                {
                    case 'abandoned':
                    case 'cancelled':
                    case 'closed':
                        $this->cancelled($bet);
                        break;
                    case 'ended':
                        $this->ended($bet, $confrontation);
                        break;
                }

                $bet->save();
            });
        }
    }

    private function cancelled(Bet $bet) : void
    {
        // Mes à jour le status du pari a annulé.
        $bet->status = Ticket::STATUS_CANCELLED;

        // Vérifie si le type du ticket est combiné.
        if ($bet->ticket_type === 'combined')
        {
            // Mes à jour le status du ticket a annulé.
            $ticket = Ticket::findOrFail($bet->ticket_id);
            $ticket->status = Ticket::STATUS_CANCELLED;
            $ticket->save();
        }
    }

    private function ended(Bet $bet, Confrontation $confrontation) : void
    {
        $won = $this->betWon($bet, $confrontation->teams);

        switch ($bet->ticket_type)
        {
            case 'simple':
                $this->endedSimple($won, $bet);
                break;

            case 'combined':
                $this->endedCombined($won, $bet);
                break;
        }
    }

    private function endedSimple(bool $won, Bet $bet)
    {
        $bet->status = $won ? Bet::STATUS_PAID : Bet::STATUS_LOST;

        // Récupère tous les paris du ticket sauf celui actuel.
        $bets = Bet::where('ticket_id', '=', $bet->ticket_id)
            ->where('id', '!=', $bet->id)
            ->get();

        if (count($bets) === 0)
        {
            $ticket = Ticket::findOrFail($bet->ticket_id);
            $ticket->status = Ticket::STATUS_RIPPED;
            $ticket->save();
        }

        // @TODO: Faire quelque chose pour réglé le pari gagné.
    }

    private function endedCombined(bool $won, Bet $bet)
    {
        $bet->status = $won ? Bet::STATUS_WON : Bet::STATUS_LOST;

        if ($won)
        {
            // Récupère tous les paris du ticket sauf celui actuel.
            $bets = Bet::where('ticket_id', '=', $bet->ticket_id)
                ->where('id', '!=', $bet->id)
                ->get();

            // Parcours l'ensemble des paris du ticket.
            foreach ($bets as $b)
            {
                // Vérifie si le status du pari est différent de gagné.
                if ($b->status !== Bet::STATUS_WON)
                {
                    $won = false;
                    break;
                }
            }

            if ($won)
            {
                $ticket = Ticket::findOrFail($bet->ticket_id);
                $ticket->status = Ticket::STATUS_PAID;
                $ticket->save();

                // @TODO: Faire quelque chose pour réglé le ticket gagnant.
            }
        }
        else
        {
            $ticket = Ticket::findOrFail($bet->ticket_id);
            $ticket->status = Ticket::STATUS_RIPPED;
            $ticket->save();

            // @TODO: Faire quelque chose pour notifié le parieur que le ticket à été déchiré.
        }
    }

    private function betWon(Bet $bet, Collection $teams) : bool
    {
        return $this->betTeamWon($bet, $teams[0]) || $this->betTeamWon($bet, $teams[1]);
    }

    private function betTeamWon(Bet $bet, Team $team) : bool
    {
        return $bet->team_id === $team->id && $team->pivot->result === 'won';
    }
}
