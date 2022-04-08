<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param Request $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param Request $request
     * @return array
     */
    public function share(Request $request)
    {
        $user   = $request->user();

        $flash              = session('flash', []);
        $session_tickets    = session('auth.session_tickets', []);

        return array_merge(parent::share($request), [
            'auth'  => [
                'user' => $user,
                'session_tickets' => $session_tickets
            ],
            'flash' => $flash
        ]);
    }
}
