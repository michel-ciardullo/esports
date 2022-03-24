<?php

namespace App\Http\Controllers\ESport;

use App\Http\Controllers\Controller;
use App\Models\Confrontation;
use App\Models\Game;
use App\Models\Tournament;
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
        $confrontations = Confrontation::with('teams', 'live')->where('date', '>=', date('Y-m-d'))->get();
        $tournaments    = Tournament::whereIn('id', $confrontations->keys())->get();
        $games          = Game::whereIn('id', $tournaments->keys())->get();

        $today = $games->map(function ($game) use($tournaments, $confrontations)
        {
            $tournaments = $tournaments->filter(fn ($tournament) => $tournament->game_id === $game->id)
                ->map(function ($tournament) use($confrontations)
                {
                    $confrontations = $confrontations->filter(fn ($confrontation) => $confrontation->tournament_id === $tournament->id)->all();

                    return array_merge($tournament->toArray(), compact('confrontations'));
                })
                ->all();

            return array_merge($game->toArray(), compact('tournaments'));
        });

        /*$today = [];
        $confrontations->each(function ($confrontation, $game_id) use(&$today, $games, $tournaments)
        {
            $tournament = $tournaments[$game_id];
            $game       = $games[$game_id];

            if (!array_key_exists($game_id, $today))
            {
                $today[$game_id] = array_merge($game->toArray(), ['tournaments' => []]);
            }

            if (!array_key_exists($tournament->id, $today[$game_id]['tournaments']))
            {
                $today[$game_id]['tournaments'][$tournament->id] = array_merge($tournament->toArray(), ['confrontations' => []]);
            }

            $today[$game_id]['tournaments'][$tournament->id]['confrontations'][$confrontation->id] = $confrontation->toArray();
        });

        dd($today);*/

        return Inertia::render('Game/Show', compact('games', 'tournaments', 'confrontations', 'today'));
    }

    public function show(string $slug)
    {
        dd($slug);
    }
}
