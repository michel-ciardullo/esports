<?php

namespace App\Console\Commands;

use App\Events\EADataApiEvent;
use Exception;
use Illuminate\Console\Command;

class ESportCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api:e-sports';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Save E-Sport data api';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     * @throws Exception
     */
    public function handle() : int
    {
        $this->fetchApiWithInterval(-1);
        $this->fetchApiWithInterval(0);
        $this->fetchApiWithInterval(1);
        return 0;
    }

    private function fetchApiWithInterval(int $nDay)
    {
        $filters = [];
        if ($nDay > 0 || $nDay < 0)
        {
            $filters['interval'] = "${nDay}DAY";
        }

        $responseData = $this->fetchApi($filters);
        if (count($responseData) > 0)
        {
            event(new EADataApiEvent($responseData));
        }
    }

    /**
     * @param array $tournaments
     * @return array
     */
    private function fetchApi(array $tournaments = []) : array
    {
        // Build url with query params
        $queryParams = array_merge([
            'token' => config('services.e_sport.token')
        ], $tournaments);

        $query  = http_build_query($queryParams);
        $url    = sprintf('%s?%s', config('services.e_sport.endpoint'), $query);
        $this->comment($url);

        // fetch request with curl
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);

        return $response ? json_decode($response) : [];
    }

}
