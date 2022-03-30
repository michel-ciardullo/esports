<?php

namespace App\API;

class RGApi
{
    public static function fetch(string $game, string $path, array $query = [])
    {
        $defaultQuery = array_merge(['hl' => 'fr-FR'], $game === 'lol' ? [] : ['sport' => 'val']);

        $query = http_build_query(array_merge($defaultQuery, $query));

        $headers = [];
        $headers[] = 'x-api-key: ' . config('services.lol.token');
        $headers[] = 'Content-Type: application/json';

        $url = sprintf('%s%s?%s', $game === 'lol' ? config('services.lol.endpoint') : config('services.val.endpoint'), $path, $query);

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);

        return $response ? json_decode($response) : [];
    }
}
