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
    private function postTreatment($games, $tournaments, $confrontations)
    {
        return $games->map(function ($game) use($tournaments, $confrontations)
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
    }

    /**
     * @return Response
     */
    public function index() : Response
    {
        $confrontations = Confrontation::with('teams', 'live')/*->where('date', '>=', date('Y-m-d'))*/->get()->keyBy('id');
        $tournaments    = Tournament::whereIn('id', $confrontations->keys())->get()->keyBy('id');
        $games          = Game::whereIn('id', $tournaments->keys())->get()->keyBy('id');

        $lives = [
            'games'             => [],
            'tournaments'       => [],
            'confrontations'    => []
        ];

        $confrontations->each(function ($confrontation) use (&$lives, $tournaments)
        {
            $tournament = $tournaments[$confrontation->tournament_id];

            $push = function (&$arr, $tournament, $confrontation)
            {
                if (!array_search($tournament->game_id, $arr['games'], true))
                {
                    $arr['games'][] = $tournament->game_id;
                }

                if (!array_search($confrontation->tournament_id, $arr['tournaments'], true))
                {
                    $arr['tournaments'][] = $confrontation->tournament_id;
                }

                if (!array_search($confrontation->id, $arr['confrontations'], true))
                {
                    $arr['confrontations'][] = $confrontation->id;
                }
            };

            if ($confrontation->status === 'live')
            {
                $push($lives, $tournament, $confrontation);
            }
        });

        return Inertia::render('Game/Show', compact('confrontations', 'tournaments', 'games', 'lives'));
    }

    public function show(string $slug)
    {
        dd($slug);
    }
}
