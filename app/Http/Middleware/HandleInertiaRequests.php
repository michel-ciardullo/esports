<?php

namespace App\Http\Middleware;

use App\Models\Confrontation;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param Request $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param Request $request
     * @return array
     */
    public function share(Request $request)
    {
        $user   = $request->user();

        $flash              = session('flash', []);
        $sessionTickets    = session('auth.session_tickets', []);

        $confrontationsIds = [];
        foreach ($sessionTickets as $sessionTicket)
        {
            $confrontationsIds[] = $sessionTicket['confrontation_id'];
        }
        $confrontations = Confrontation::with('teams')
            ->whereIn('id', $confrontationsIds)->with('teams')
            ->get()
            ->keyBy('id');

        $tickets = [];
        foreach ($sessionTickets as $sessionTicket)
        {
            $confrontationId = $sessionTicket['confrontation_id'];
            $confrontation = $confrontations[$confrontationId];

            $teamId = $sessionTicket['team_id'];
            $team_index = 0;
            foreach ($confrontation->teams->all() as $index => $team)
            {
                if ($team->id === $teamId)
                {
                    $team_index = $index;
                    break;
                }
            }

            $tickets[] = compact('confrontation', 'team_index');
        }

        return array_merge(parent::share($request), [
            'auth'  => [
                'user' => $user,
                'session_tickets' => $tickets
            ],
            'flash' => $flash
        ]);
    }
}
