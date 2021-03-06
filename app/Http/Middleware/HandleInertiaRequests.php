<?php

namespace App\Http\Middleware;

use App\Models\Game;
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
        $flash  = $request->session()->get('flash', []);
        $games  = Game::all();

        return array_merge(parent::share($request), [
            'auth' => ['user' => $user],
            'flash' => $flash,
            'games' => $games,
        ]);
    }
}
