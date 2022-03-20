@component('mail::message')
    # Contact

    - name: {{ $user->name }}
    - email: {{ $user->email }}

    subject message: {{ $subjectMessage }}
    message: {{ $message }}

    Merci,
    {{ config('app.name') }}
@endcomponent
