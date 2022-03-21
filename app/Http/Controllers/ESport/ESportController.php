<?php

namespace App\Http\Controllers\ESport;

use App\Http\Controllers\Controller;
use App\Models\Confrontation;
use Illuminate\Support\Facades\Date;
use Inertia\{
    Inertia,
    Response
};

class ESportController extends Controller
{
    const LAST_DAY = 3;

    /**
     * @return Response
     */
    public function index() : Response
    {
        // $confrontations = $this->getConfrontations();

        return Inertia::render('ESport/Index');
    }

    private function getConfrontations() {
        $currentDate = Date::now()
            ->addDay(-ESportController::LAST_DAY)
            ->format('Y-m-d');

        return Confrontation::whereDate('date', '>=', $currentDate)
            ->limit(10)
            ->get();
    }
}
