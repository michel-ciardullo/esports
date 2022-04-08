<?php

namespace App\Observers;

use App\Models\Confrontation;
use App\Models\Ticket;

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
        if ($confrontation->status !== 'live' && $confrontation->status !== 'not_started')
        {
            $tickets = Ticket::leftJoin('bets', 'bets.ticket_id', '=', 'tickets.id')
                ->where('bets.confrontation_id', '=', $confrontation->id)
                ->where('tickets.status', '=', 'active')
                ->get();

            $tickets->each(function ($ticket) use($confrontation)
            {
                switch ($confrontation->status) {
                    case 'abandoned':
                    case 'cancelled':
                    case 'closed':
                        $ticket->status = Ticket::STATUS_CANCEL;
                        break;
                    case 'ended':
                        $winner = false;
                        foreach ($confrontation->teams as $team)
                        {
                            if (empty($team->pivot->result))
                            {
                                break;
                            }

                            if ($team->pivot->result === 'won' && $ticket->team_id === $team->id)
                            {
                                $winner = true;
                                break;
                            }
                        }

                        $ticket->status = $winner ? Ticket::STATUS_WINNER : Ticket::STATUS_CANCEL;
                        break;
                }

                $ticket->save();
            });
        }
    }
}
