<?php

namespace App\Http\Controllers\ESport;

use App\Http\Controllers\Controller;
use App\Models\Confrontation;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;
use Inertia\Response;

class ESportController extends Controller
{
    /**
     * @return Response
     */
    public function index() : Response
    {
        /*$currentDate = Date::now()->addDay(-2)->format('Y-m-d');

        $confrontations = Confrontation::whereDate('date', '>=', $currentDate)
            ->limit(10)
            ->get();

        dd($currentDate, $confrontations[0]->teams);*/

        return Inertia::render('ESport/Index');
    }
}
