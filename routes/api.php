<?php

use App\API\RGApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/esports/teams', function (Request $request) {
    $response = RGApi::fetch('lol', 'getTeams');
    return '<pre>' . json_encode($response, JSON_PRETTY_PRINT) . '</pre>';
});

Route::get('/esports/tournaments', function (Request $request) {
    $response = RGApi::fetch('lol', 'getTournaments');
    return '<pre>' . json_encode($response, JSON_PRETTY_PRINT) . '</pre>';
});

Route::get('/esports/leagues', function (Request $request) {
    $response = RGApi::fetch('lol', 'getLeagues');
    return '<pre>' . json_encode($response, JSON_PRETTY_PRINT) . '</pre>';
});

Route::get('/esports/vods', function (Request $request) {
    $response = RGApi::fetch('lol', 'getVodsForHome');
    return '<pre>' . json_encode($response, JSON_PRETTY_PRINT) . '</pre>';
});

Route::get('/esports/events', function (Request $request) {
    $response = RGApi::fetch('lol', 'getEventDetails', ['id' => '108035548029874490']);
    return '<pre>' . json_encode($response, JSON_PRETTY_PRINT) . '</pre>';
});

Route::get('/esports/live', function (Request $request) {
    $response = RGApi::fetch('lol', 'getLive');
    return '<pre>' . json_encode($response, JSON_PRETTY_PRINT) . '</pre>';
});
