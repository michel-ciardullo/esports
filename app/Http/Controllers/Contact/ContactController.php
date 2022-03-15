<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\ContactSendRequest;
use App\Mail\Contact\ContactMail;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * @return Response
     */
    public function index() : Response
    {
        return Inertia::render('Contact/Index');
    }

    /**
     * @param ContactSendRequest $request
     * @return RedirectResponse
     */
    public function send(ContactSendRequest $request) : RedirectResponse
    {
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');

        $subject = $request->input('subject');
        $message = $request->input('message');

        Mail::to($request->user())->send(new ContactMail($user, $subject, $message));

        return back(303)
            ->with('flash', [
                'status' => 'success',
                'message' => 'Le message à bien été envoyer ;).'
            ]);
    }
}
