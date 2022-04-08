<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'tickets',
    'as' => 'tickets.'
], function ($router) {
    $router->post('/add/{selected}', 'App\\Http\\Controllers\\Ticket\\TicketController@add')->name('add');
    $router->post('/remove/{selected}', 'App\\Http\\Controllers\\Ticket\\TicketController@remove')->name('remove');
    $router->post('/store', 'App\\Http\\Controllers\\Ticket\\TicketController@store')->name('store');
});
