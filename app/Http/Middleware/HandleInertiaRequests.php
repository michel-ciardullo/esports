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
    public function version(Request $request) : string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param Request $request
     * @return array
     */
    public function share(Request $request) : array
    {
        return array_merge(parent::share($request), [
            'auth'  => $this->getAuth($request),
            'flash' => $this->getFlash($request)
        ]);
    }

    private function getAuth(Request $request) : array | null
    {
        $user = $request->user();

        return $user ? [
            'user' => $user,
            'ticket' => $this->getTicket($request)
        ] : null;
    }

    private function getFlash(Request $request)
    {
        return $request->get('flash', []);
    }

    private function getTicket(Request $request) : array
    {
        // Initialise une valeur par default.
        $defaultValues = [
            'items' => [],      // Contient la liste des confrontations associée au résultat du match spécifié
            'ids' => [],        // Contient la liste des id des confrontations.
        ];

        $session    = $request->session();
        $ticket     = $session->get('auth.ticket', $defaultValues);

        $confrontations = Confrontation::getForTicket($ticket['ids']);

        $items      = [];

        foreach ($confrontations as $k => $confrontation)
        {
            $team1              = $confrontation->teams[0];
            $team2              = $confrontation->teams[1];

            $resultTeamIndex    = $ticket['items'][$confrontation->id];
            $resultTeam         = $confrontation->teams[$resultTeamIndex];
            $resultTeamRating   = floatval($resultTeam->pivot->rating);

            $items[] = [
                'header' => $confrontation->game_slug,
                'title' => "$team1->name vs $team2->name",
                'result' => $resultTeam->name,
                'rating' => $resultTeamRating,
                'link' => route('esports.confrontation', [
                    $confrontation->game_slug,
                    $confrontation->tournament_slug,
                    $confrontation->id,
                ]),
            ];
        }

        $session->put('auth.ticket', $ticket);

        return $items;
    }
}
