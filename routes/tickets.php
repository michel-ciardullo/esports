<?php

use Illuminate\Support\Facades\Route;

Route::post('/ticket', 'App\\Http\\Controllers\\Ticket\\SessionTicketController@add')->name('ticket.add');
Route::delete('/ticket/{index}', 'App\\Http\\Controllers\\Ticket\\SessionTicketController@destroy')->name('ticket.destroy');

Route::post('/tickets', 'App\\Http\\Controllers\\Ticket\\TicketController@store')->name('tickets.store');
