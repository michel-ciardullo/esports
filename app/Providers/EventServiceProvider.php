<?php

namespace App\Providers;

use App\Events\EADataApiEvent;
use App\Listeners\EADataApiListener;
use App\Models\Confrontation;
use App\Observers\ConfrontationObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        EADataApiEvent::class => [
            EADataApiListener::class
        ]
    ];

    /**
     * The model observers to register.
     *
     * @var array
     */
    protected $observers = [
        Confrontation::class => ConfrontationObserver::class
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
