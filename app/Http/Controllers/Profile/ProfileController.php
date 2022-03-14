<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index() {
        return Inertia::render('Profile/Index');
    }

    public function tickets() {
        return Inertia::render('Profile/Tickets');
    }
}
