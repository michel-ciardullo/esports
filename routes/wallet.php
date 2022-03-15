<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'auth'
], function ($route) {
    $route->get('/wallet', 'App\\Http\\Controllers\\Wallet\\WalletController@index')
        ->name('wallet.index');
});
