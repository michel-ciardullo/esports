<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'auth'
], function ($route) {
    $route->get('/wallet', 'App\\Http\\Controllers\\Wallet\\WalletController@index')
        ->name('wallet.index');

    $route->post('/wallet/deposit', 'App\\Http\\Controllers\\Wallet\\WalletController@deposit')
        ->name('wallet.deposit');

    $route->post('/wallet/withdrawal', 'App\\Http\\Controllers\\Wallet\\WalletController@withdrawal')
        ->name('wallet.withdrawal');
});
