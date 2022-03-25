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
     * Display the contact
     *
     * @return Response
     */
    public function index() : Response
    {
        return Inertia::render('Contact/Index');
    }

    /**
     * Send an e-mail
     *
     * @param ContactSendRequest $request
     * @return RedirectResponse
     */
    public function send(ContactSendRequest $request) : RedirectResponse
    {
        // Create user sender
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');

        // get all fiels for the message
        $subject = $request->input('subject');
        $message = $request->input('message');

        // Send mail from user to contact
        Mail::to($request->user())
            ->send(new ContactMail($user, $subject, $message));

        // redirect back page method 'GET'.
        return back(303)
            ->with('flash', [
                'status' => 'success',
                'message' => 'Le message à bien été envoyer ;).'
            ]);
    }
}
