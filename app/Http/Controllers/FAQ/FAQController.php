<?php

namespace App\Http\Controllers\FAQ;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class FAQController extends Controller
{
    /**
     * @return Response
     */
    public function index() : Response
    {
        return Inertia::render('FAQ/Index');
    }
}
