<?php

namespace App\Http\Controllers\ESport;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ESportController extends Controller
{
    /**
     * @return Response
     */
    public function index() : Response
    {
        return Inertia::render('ESport/Index');
    }
}
