<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Models\Confrontation;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request) : RedirectResponse
    {
        $ticket = $request->session()->get('auth.ticket', []);
        $rules = [
            'type' => ['required', 'string']
        ];
        $amountRule = ['required', 'int', 'between:1,10'];

        switch ($request->input('type'))
        {
            case 'simple':
                $this->storeSimple($request, $ticket, $rules, $amountRule);
                break;

            case 'combined':
                $this->storeCombined($request, $ticket, $rules, $amountRule);
                break;
        }

        return back();
    }

    public function storeSimple(Request $request, $ticket, $rules, $amountRule) : void
    {
        // validation

        $messages = [];
        foreach ($ticket['ids'] as $k => $v)
        {
            $rules["amounts.$k"] = $amountRule;
        }
        $request->validate($rules, $messages);

        // ticket

        $amounts        = $request->get('amounts');

        $bets           = [];

        $index = 0;

        $confrontations = Confrontation::whereIn('id', $ticket['ids'])->get()->keyBy('id');

        foreach ($ticket['items'] as $confrontationId => $resultTeamIndex)
        {
            $amount         = $amounts[$index++];
            $confrontation  = $confrontations[$confrontationId];
            $teamPivot      = $confrontation->teams[$resultTeamIndex]->pivot;

            $bets[] = [
                'confrontation_id'  => $confrontationId,
                'team_id'           => $teamPivot->team_id,
                'rating'            => $teamPivot->rating,
                'amount'            => $amount,
                'status'            => 'active',
            ];
        }

        $this->createTicket($request, 'simple', $bets);
    }

    public function storeCombined(Request $request, $ticket, $rules, $amountRule) : void
    {
        $rules['amount'] = $amountRule;
        $request->validate($rules);

        $amount = $request->get('amount');

        // ticket

        $bets           = [];

        $confrontations = Confrontation::whereIn('id', $ticket['ids'])->get()->keyBy('id');

        foreach ($ticket['items'] as $confrontationId => $resultTeamIndex)
        {
            $confrontation  = $confrontations[$confrontationId];
            $teamPivot      = $confrontation->teams[$resultTeamIndex]->pivot;

            $bets[] = [
                'confrontation_id'  => $confrontationId,
                'team_id'           => $teamPivot->team_id,
                'rating'            => $teamPivot->rating,
                'amount'            => $amount,
                'status'            => 'active',
            ];
        }

        $this->createTicket($request, 'combined', $bets);
    }

    private function createTicket(Request $request, string $type, array &$bets)
    {
        $ticket = Ticket::create([
            'user_id' => $request->user()->id,
            'status' => 'active',
            'type' => $type
        ]);

        $ticket->bets()->createMany($bets);

        $request->session()->remove('auth.ticket');
    }

}
