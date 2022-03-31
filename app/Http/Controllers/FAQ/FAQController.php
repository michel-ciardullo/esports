<?php

namespace App\Http\Controllers\FAQ;

use App\Http\Controllers\Controller;
use App\Http\Requests\FAQ\FAQRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\{
    Inertia,
    Response
};
use App\Models\FAQ;

class FAQController extends Controller
{
    /**
     * @return Response
     */
    public function index() : Response
    {
        $faq = FAQ::all();

        return Inertia::render('FAQ/Index', compact('faq'));
    }
    /**
     * Send an e-mail
     *
     * @param FAQRequest $request
     * @return RedirectResponse
     */
    public function store(FAQRequest $request) : RedirectResponse
    {
        $inputs = $request->all();
        FAQ::create($inputs);

        // redirect back page method 'GET'.
        return back(303)
            ->with('flash', [
                'status' => 'success',
                'message' => 'Le message à bien été envoyé ;).'
            ]);
    }
}
