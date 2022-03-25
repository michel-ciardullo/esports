<?php

namespace App\Http\Controllers\ESport;

use App\Http\Controllers\Controller;
use App\Models\{
    Confrontation,
    Game,
    Tournament
};
use Illuminate\Support\Carbon;
use Inertia\{
    Inertia,
    Response
};

class ESportController extends Controller
{
    /**
     * @return Response
     */
    public function index() : Response
    {
        // select * from `confrontations` where `date` >= '2022-03-25'
        $confrontations = Confrontation::with('teams', 'live')
            ->whereDate('date', '>=', date('Y-m-d'))
            ->whereDate('date', '<=', Carbon::tomorrow())
            ->get()
            ->keyBy('id');

        // select * from tournaments where id in (1, 2, 3, etc...)
        $tournaments    = Tournament::whereIn('id', $confrontations->keys())->get()->keyBy('id');

        // select * from games where id in (1, 2, 3, etc...)
        $games          = Game::whereIn('id', $tournaments->keys())->get()->keyBy('id');

        // Init les filtre des ids
        $lives      = $this->initIds();
        $today      = $this->initIds();
        $tomorrow   = $this->initIds();

        foreach ($confrontations as $confrontation)
        {
            if ($confrontation->status === 'live')
            {
                $this->postTreatment($lives, $confrontation, $tournaments, $games);
            }
            else if ($confrontation->date === date('Y-m-d'))
            {
                $this->postTreatment($today, $confrontation, $tournaments, $games);
            }
            else
            {
                $this->postTreatment($tomorrow, $confrontation, $tournaments, $games);
            }
        }

        unset($lives['prevents']);
        unset($today['prevents']);
        unset($tomorrow['prevents']);

        return Inertia::render('ESport/Index', compact('confrontations', 'tournaments', 'games', 'lives', 'today' ,'tomorrow'));
    }

    public function show(string $slug)
    {
        dd($slug);
    }

    private function postTreatment(&$arr, $confrontation, $tournaments, $games)
    {
        $tournament = $tournaments[$confrontation->tournament_id];
        $game       = $games[$tournament->game_id];

        // Initialise game list
        if (!array_key_exists($game->id, $arr['prevents']['games']))
        {
            $arr['games'][]                         = $game->id;
            $arr['prevents']['games'][$game->id]    = true;
        }

        // Initialise tournament list
        if (!array_key_exists($game->id, $arr['tournaments']))
        {
            $arr['tournaments'][$game->id] = [];
        }
        if (!array_key_exists($tournament->id, $arr['prevents']['tournaments']))
        {
            $arr['tournaments'][$game->id][]                    = $tournament->id;
            $arr['confrontations'][$tournament->id]             = [];
            $arr['prevents']['tournaments'][$tournament->id]    = true;
        }

        // Initialise confrontation list
        $arr['confrontations'][$tournament->id][] = $confrontation->id;
    }

    private function initIds() {
        return [
            'games'             => [],
            'tournaments'       => [],
            'confrontations'    => [],

            'prevents'          => [
                'games'             => [],
                'tournaments'       => [],
                'confrontations'    => [],
            ]
        ];
    }
}
