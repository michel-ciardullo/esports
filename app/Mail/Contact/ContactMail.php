<?php

namespace App\Mail\Contact;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(
        private User $user,
        private string $subjectMessage,
        private string $message
    ) {}

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mail.contact')
            ->subject($this->subject)
            ->with([
                'user' => $this->user,
                'subjectMessage' => $this->subjectMessage,
                'message' => $this->message
            ]);
    }
}
