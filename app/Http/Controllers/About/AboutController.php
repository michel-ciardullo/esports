<?php

namespace App\Http\Controllers\About;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    /**
     * @return Response
     */
    public function index() : Response
    {
        return Inertia::render('About');
    }
}
