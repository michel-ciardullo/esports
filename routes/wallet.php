<?php

use Illuminate\Support\Facades\Route;

Route::get('/wallet', 'App\\Http\\Controllers\\Wallet\\WalletController@index')
    ->name('wallet.index');

Route::post('/wallet/deposit', 'App\\Http\\Controllers\\Wallet\\WalletController@deposit')
    ->name('wallet.deposit');

Route::post('/wallet/withdrawal', 'App\\Http\\Controllers\\Wallet\\WalletController@withdrawal')
    ->name('wallet.withdrawal');
