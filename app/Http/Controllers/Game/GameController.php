<?php

namespace App\Http\Controllers\Game;

use App\{
    Http\Controllers\Controller,
    Models\Game
};
use Inertia\{
    Inertia,
    Response
};

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() : Response
    {
        return Inertia::render('Game/Index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show(int $id) : Response
    {
        $game = Game::with('tournaments')->findOrFail($id);

        return Inertia::render('Game/Show', compact('game'));
    }
}
