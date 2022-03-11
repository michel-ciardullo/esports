<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // games
        return Inertia::render('Game/Index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $game           = Game::findOrFail($id);
        $tournaments    = $game->tournaments;
        foreach ($tournaments as $tournament)
            $tournament->matches;

        return Inertia::render('Game/Show', compact('game', 'tournaments'));
    }
}
