@component('mail::message')
    # Contact

    - name: {{ $user->name }}
    - email: {{ $user->email }}

    subject message: {{ $subjectMessage }}
    message: {{ $message }}

    Thanks,
    {{ config('app.name') }}
@endcomponent
