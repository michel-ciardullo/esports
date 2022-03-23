<?php

namespace App\Http\Controllers\ESport;

use App\Http\Controllers\Controller;
use App\Models\Confrontation;
use Carbon\Carbon;
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
        $dateNow = Carbon::now();

        $data = Confrontation::with([
                'tournament' => fn ($t) => $t->with('game'),
                'teams',
                'live',
            ])
            ->whereDate('confrontations.date', '>=', $dateNow)
            ->whereTime('confrontations.time', '>=', $dateNow)
            ->get();

        $games = [];

        foreach ($data as $value)
        {
            $game = $value->tournament->game;
        }

        return Inertia::render('Game/Show', ['games' => $data]);
    }

    public function show(string $slug)
    {
        dd($slug);
    }
}
