<?php

namespace App\Http\Controllers\ESport;

use App\Http\Controllers\Controller;
use App\Models\Game;
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
        $games = Game::with([
            'tournaments' => fn ($tournament) => $tournament->with(['confrontations' => fn ($c) => $c->with('teams')])->whereHas('confrontations')
        ])
        ->whereHas('tournaments')
        ->get();

        return Inertia::render('ESport/Index', compact('games'));
    }

    public function show(string $slug)
    {
        $game = Game::with([
            'tournaments' => fn ($tournament) => $tournament->with('confrontations')->whereHas('confrontations')
        ])
        ->whereHas('tournaments')
        ->where('slug', $slug)
        ->firstOrFail();

        $games = [$game];

        return Inertia::render('ESport/Index', compact('games'));
    }
}
