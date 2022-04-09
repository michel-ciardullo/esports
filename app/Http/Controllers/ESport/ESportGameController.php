<?php

namespace App\Http\Controllers\ESport;

use App\Collections\ESport\ESport\GameCollection;
use App\Models\Confrontation;
use Inertia\{Inertia, Response};

class ESportGameController extends ESportController
{
    /**
     * @return Response
     */
    public function index() : Response
    {
        $confrontations = Confrontation::getAll($this->yesterdayDateTime, $this->tomorrowDateTime);
        $esports = new GameCollection($confrontations);

        return Inertia::render('ESport/Index', [
            'esports' => $esports->all()
        ]);
    }

    /**
     * Show tournaments for game.
     *
     * @param string $slug
     * @return Response
     */
    public function show(string $slug) : Response
    {
        $confrontations = Confrontation::getForOneGame($slug, $this->yesterdayDateTime, $this->tomorrowDateTime);
        $esports = new GameCollection($confrontations);

        if ($esports->count() === 0) {
            abort(404);
        }

        return Inertia::render('ESport/Game', [
            'esport' => $esports->all()[0]
        ]);
    }
}
