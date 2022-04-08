<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function add(Request $request)
    {
        $inputs     = $request->all();

        $game           = $inputs['game'];
        $tournament     = $inputs['tournament'];
        $confrontation  = $inputs['confrontation'];

        $selected   = $request->selected;

        $ticket = [
            'title' => $confrontation['teams'][0]['name'] . ' vs ' . $confrontation['teams'][1]['name'],
            'confrontation' => [
                'id' => $confrontation['id'],
                'link' => route('esports.confrontation', [
                    $game['slug'],
                    $tournament['slug'],
                    $confrontation['id']
                ]),
                'status' => $confrontation['status'],
            ],
            'tournament' => [
                'name' => $tournament['name']
            ],
            'team' => [
                'id' => $confrontation['teams'][$selected]['id'],
                'name' => $confrontation['teams'][$selected]['name'],
                'rating' => $confrontation['teams'][$selected]['pivot']['rating'],
            ],
            'game' => [
                'slug' => $game['slug']
            ]
        ];

        $session        = $request->session();
        $sessionTickets = $session->get('auth.session_tickets', []);

        if (!in_array($ticket, $sessionTickets))
        {
            $sessionTickets[] = $ticket;
            session()->put('auth.session_tickets', $sessionTickets);
        }

        return back();
    }

    public function remove(Request $request)
    {
        $session        = $request->session();
        $sessionTickets = $session->get('auth.session_tickets', []);

        if (array_key_exists($request->selected, $sessionTickets))
        {
            unset($sessionTickets[$request->selected]);
            sort($sessionTickets);

            session()->put('auth.session_tickets', $sessionTickets);
        }

        return back();
    }

    public function store(Request $request)
    {
        $sessionTickets = $request->session()->get('auth.session_tickets', []);
        $rules = [
            'type' => ['required', 'string']
        ];
        $amountRule = ['required', 'int', 'between:1,10'];

        switch ($request->input('type'))
        {
            case 'simple':
                $this->storeSimple($request, $sessionTickets, $rules, $amountRule);
                break;

            case 'combined':
                $this->storeCombined($request, $sessionTickets, $rules, $amountRule);
                break;
        }

        return back();
    }

    public function storeSimple(Request $request, $sessionTickets, $rules, $amountRule)
    {
        // validation
        $messages = [];
        foreach ($sessionTickets as $k => $v)
        {
            $rules["amounts.$k"] = $amountRule;
        }
        $request->validate($rules, $messages);

        // ticket
        $amounts = $request->get('amounts');
        $totalAmount = .0;
        $totalRating = .0;
        $bets = [];
        foreach ($sessionTickets as $k => $v)
        {
            $amount = $amounts[$k];
            $totalAmount += $amount;

            $rating = $v['team']['rating'];
            $totalRating += $rating;

            $bets[] = [
                'confrontation_id' => $v['confrontation']['id'],
                'team_id' => $v['team']['id'],
                'rating' => $rating,
                'amount' => $amount,
            ];
        }

        $this->createTicket($request,  $totalRating, $totalAmount, $bets);
    }

    public function storeCombined(Request $request, $sessionTickets, $rules, $amountRule)
    {
        $rules['amount'] = $amountRule;
        $request->validate($rules);

        $amount = $request->get('amount');

        $totalAmount = .0;
        $totalRating = .0;
        $bets = [];
        foreach ($sessionTickets as $v)
        {
            $totalAmount += $amount;

            $rating = $v['team']['rating'];
            $totalRating += $rating;

            $bets[] = [
                'confrontation_id' => $v['confrontation']['id'],
                'team_id' => $v['team']['id'],
                'rating' => $rating,
                'amount' => $amount,
            ];
        }

        $this->createTicket($request,  $totalRating, $totalAmount, $bets);
    }

    private function createTicket(Request $request, float $totalRating, int $totalAmount, array &$bets) {
        $ticket = Ticket::create([
            'user_id' => $request->user()->id,
            'total_rating' => $totalRating,
            'total_amount' => $totalAmount,
            'status' => 'active',
            'type' => 'simple'
        ]);

        $ticket->bets()->createMany($bets);

        $request->session()->remove('auth.session_tickets');
    }

}
