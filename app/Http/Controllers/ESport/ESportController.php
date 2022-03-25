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
            ])
            ->leftJoin('tournaments', function ($join) {
                $join->on('tournaments.id', '=', 'confrontations.tournament_id');
            })
            ->leftJoin('games', function ($join) {
                $join->on('games.id', '=', 'tournaments.game_id');
            })
            ->where('date', '>=', date('Y-m-d'))
            ->get();

        dd($eSports[0]);
        */
        
        $confrontations = Confrontation::with('teams', 'live')->where('date', '>=', date('Y-m-d'))->get()->keyBy('id');
        $tournaments    = Tournament::whereIn('id', $confrontations->keys())->get()->keyBy('id');
        $games          = Game::whereIn('id', $tournaments->keys())->get()->keyBy('id');

        $today = [
            'games'             => [],
            'tournaments'       => [],
            'confrontations'    => []
        ];

        $lives = [
            'games'             => [],
            'tournaments'       => [],
            'confrontations'    => []
        ];

        $push = function (&$arr, $tournaments, $games, $confrontation)
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
        };

        foreach ($confrontations as $confrontation)
        {
            if ($confrontation->status === 'live')
            {
                $push($lives, $tournaments, $games, $confrontation);
            }
            else
            {
                $push($today, $tournaments, $games, $confrontation);
            }
        }

        return Inertia::render('Game/Show', compact('confrontations', 'tournaments', 'games', 'today', 'lives'));
    }

    public function show(string $slug)
    {
        dd($slug);
    }
}
