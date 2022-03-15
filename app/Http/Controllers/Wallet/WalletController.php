<?php

namespace App\Http\Controllers\Wallet;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class WalletController extends Controller
{
    /**
     * @return Response
     */
    public function index() : Response
    {
        return Inertia::render('Wallet/Index');
    }
}
