<?php

namespace App\Http\Controllers\ESport;

use App\Collections\ESport\ESport\GameCollection;
use App\Models\Confrontation;
use Inertia\{
    Inertia,
    Response
};

class ESportConfrontationController extends ESportController
{
    /**
     * Show confrontation.
     *
     * @param string $gameSlug
     * @param string $tournamentSlug
     * @param int $confrontationId
     * @return Response
     */
    public function index(string $gameSlug, string $tournamentSlug, int $confrontationId) : Response
    {
        $confrontation  = Confrontation::getForOneConfrontation($gameSlug, $tournamentSlug, $confrontationId, $this->yesterdayDateTime, $this->tomorrowDateTime);
        $collection = new GameCollection($confrontation);

        if ($collection->count() === 0)
        {
            abort(404);
        }

        return Inertia::render('ESport/Confrontation', [
            'esport' => $collection->all()[0]
        ]);
    }
}
