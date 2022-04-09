<?php

namespace App\Http\Controllers\ESport;

use App\Collections\ESport\ESport\GameCollection;
use App\Models\{Confrontation};
use Inertia\{
    Inertia,
    Response
};

class ESportTournamentController extends ESportController
{
    /**
     * Show confrontations for tournament.
     *
     * @param string $gameSlug
     * @param string $tournamentSlug
     * @return Response
     */
    public function index(string $gameSlug, string $tournamentSlug) : Response
    {
        $confrontations = Confrontation::getForOneTournament($gameSlug, $tournamentSlug, $this->yesterdayDateTime, $this->tomorrowDateTime);
        $collection = new GameCollection($confrontations);

        if ($collection->count() === 0) {
            abort(404);
        }

        return Inertia::render('ESport/Tournament', [
            'esport' => $collection->all()[0]
        ]);
    }
}
