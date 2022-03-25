<?php

namespace App\Http\Controllers\ESport;

use App\Http\Controllers\Controller;
use App\Models\{
    Confrontation,
    Game,
    Tournament
};
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
        /*
        $eSports = Confrontation::with('teams', 'live')
            ->select([
                'tournaments.name as tournament_name',
                'games.name as game_name',
                'confrontations.status as confrontation_status',
                'confrontations.date as confrontation_date',
                'confrontations.time as confrontation_time',
                'confrontations.id as id'
            ])
            ->leftJoin('tournaments', function ($join) {
                $join->on('tournaments.id', '=', 'confrontations.tournament_id');
            })
            ->leftJoin('games', function ($join) {
                $join->on('games.id', '=', 'tournaments.game_id');
            })
            ->where('date', '>=', date('Y-m-d'))
            ->get();

        $lives = [];
        $eSports->each(function ($eSport) use(&$lives)
        {
            if ($eSport->confrontation_status === 'live')
            {
                $lives[] = $eSport->live;
            }
        });

        dd($lives);
        */

        // select * from `confrontations` where `date` >= '2022-03-25'
        $confrontations = Confrontation::with('teams', 'live')->where('date', '>=', date('Y-m-d'))->get()->keyBy('id');

        // select * from tournaments where id in (1, 2, 3, etc...)
        $tournaments    = Tournament::whereIn('id', $confrontations->keys())->get()->keyBy('id');

        // select * from games where id in (1, 2, 3, etc...)
        $games          = Game::whereIn('id', $tournaments->keys())->get()->keyBy('id');

        $today = [
            'games'             => [],
            'tournaments'       => [],
            'confrontations'    => [],

            'prevents'          => [
                'games'             => [],
                'tournaments'       => [],
                'confrontations'    => [],
            ]
        ];

        $lives = [
            'games'             => [],
            'tournaments'       => [],
            'confrontations'    => [],

            'prevents'          => [
                'games'             => [],
                'tournaments'       => [],
                'confrontations'    => [],
            ]
        ];

        foreach ($confrontations as $confrontation)
        {
            if ($confrontation->status === 'live')
            {
                $this->postTreatment2($lives, $confrontation, $tournaments, $games);
            }
            else
            {
                // $this->postTreatment2($today, $confrontation, $tournaments, $games);
            }
        }

        unset($today['prevents']);
        unset($lives['prevents']);

        foreach ($lives['games'] as $gameId)
        {
            $game           = $games[$gameId];
            echo $game->name, '<ul>';

            foreach ($lives['tournaments'][$gameId] as $tournamentId)
            {
                $tournament = $tournaments[$tournamentId];
                echo '<li>', $tournament->name, '</li>';
            }

            die('</ul>');
        }

        dd($lives);

        return Inertia::render('Game/Show', compact('confrontations', 'tournaments', 'games', 'today', 'lives'));
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
        if (!in_array($game->id, $arr['games'], true))
        {
            $arr['games'][] = $game->id;
        }

        // Initialise tournament list
        if (!array_key_exists($game->id, $arr['tournaments']))
        {
            $arr['tournaments'][$game->id] = [];
        }

        // Initialise tournament list
        if (!array_key_exists($tournament->id, $arr['confrontations']))
        {
            $arr['confrontations'][$tournament->id] = [];
        }

        // Initialise tournament list
        if (!in_array($tournament->id, $arr['tournaments'][$game->id], true))
        {
            $arr['tournaments'][$game->id][] = $tournament->id;
        }

        // Initialise tournament list
        if (!in_array($confrontation->id, $arr['confrontations'][$tournament->id], true))
        {
            $arr['confrontations'][$tournament->id][] = $confrontation->id;
        }
    }

    private function postTreatment2(&$arr, $confrontation, $tournaments, $games)
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
            $arr['prevents']['tournaments'][$tournament->id]    = true;
        }

        // Initialise confrontation list
    }
}
