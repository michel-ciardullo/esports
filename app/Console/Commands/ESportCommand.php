<?php

namespace App\Console\Commands;

use Exception;
use App\Models\{Game, GameLive, Live, Team, Tournament, Confrontation, ConfrontationTeam};
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Psy\Util\Str;

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
        $tournaments = $this->fetchApi([
            'interval' => '30DAY'
        ]);
        if (count($tournaments) > 0)
            $this->saveDataApi($tournaments);
        return 0;
    }

    /**
     * @param array $tournaments
     * @return array
     */
    private function fetchApi(array $tournaments = []) : array
    {
        $token = config('services.e_sport.token');
        $endpoint = config('services.e_sport.endpoint');

        if($token == null) {
            throw new \Exception('Invalid token');
        }
        if($endpoint == null) {
            throw new \Exception('Invalid token');
        }

        // Build url with query params
        $queryParams = array_merge([
            'token' => $token
        ], $tournaments);

        $query  = http_build_query($queryParams);
        $url    = sprintf('%s?%s', $endpoint, $query);
        $this->comment($url);

        // fetch request with curl
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);

        return $response ? json_decode($response) : [];
    }

    private function saveDataApi(array $tournaments)
    {
        foreach ($tournaments as $data)
        {
            DB::transaction(function () use ($data)
            {
                // Game
                $game = $this->GetOrCreateGameIfNotExist($data->game);
                $this->comment($game->toJson());

                // Tournament
                $tournament = $this->GetOrCreateTournamentIfNotExist($game->id, $data->tournament, $data->format);
                $this->comment($tournament->toJson());

                // Confrontation
                $confrontation = $this->GetOrCreateConfrontationIfNotExist($game->id, [
                    'external_id'   => $data->id,
                    'tournament_id' => $tournament->id,
                    'date'          => $data->date,
                    'time'          => $data->time,
                    'timezone'      => $data->timezone,
                    'status'        => $data->status
                ]);
                $this->comment($confrontation->toJson());

                // Live
                if ($confrontation->status === 'live')
                {
                    $this->createLiveOrUpdateIfNotExist($game->id, $confrontation->id, [
                        'streamer'          => $data->streamer ?? null,
                        'streamer_link'     => $data->streamlink ?? null,
                    ]);
                }

                // Team 1
                $tournamentTeam1 = $this->GetOrCreateTeam($confrontation, $data->opponent1, $data->bet1, $data->result1, 1);
                $this->comment($tournamentTeam1);

                // Team 2
                $tournamentTeam2 = $this->GetOrCreateTeam($confrontation, $data->opponent2, $data->bet2, $data->result2, 2);
                $this->comment($tournamentTeam2);

                $this->comment(PHP_EOL);
            });
        }
    }

    private function GetOrCreateGameIfNotExist(string $name)
    {
        $game = Game::where('name' , '=', $name)->first();
        if (!$game)
        {
            $game = Game::create(['name' => $name, 'slug' => \Illuminate\Support\Str::slug($name)]);
        }
        return $game;
    }

    private function GetOrCreateTournamentIfNotExist(int $gameId, string $name, string $format)
    {
        $tournament = Tournament::where('name' , '=', $name)
            ->where('game_id' , '=', $gameId)
            ->first();

        if (!$tournament)
        {
            $tournament = Tournament::create([
                'game_id' => $gameId,
                'format' => $format,
                'name' => $name
            ]);
        }

        return $tournament;
    }

    private function GetOrCreateConfrontationIfNotExist(int $gameId, array $data)
    {
        $confrontation = Confrontation::where('external_id' , '=', $data['external_id'])->first();
        if (!$confrontation)
        {
            $confrontation = Confrontation::create($data);
        }

        return $confrontation;
    }

    private function createLiveOrUpdateIfNotExist(int $gameId, int $confrontationId, array $data)
    {
        $live = Live::where('confrontation_id', $confrontationId)->first();
        if ($live)
        {
            $live->update($data);
        }
        else {

            $live = Live::create(
                array_merge(['confrontation_id'  => $confrontationId], $data)
            );

            GameLive::create([
                'game_id' => $gameId,
                'live_id' => $live->id
            ]);
        }
    }

    private function GetOrCreateTeam(Confrontation $confrontation, string $name, string $bet, string $result, int $position)
    {
        $team = $this->GetOrCreateTeamIfNotExist($name);
        $this->comment($team);

        return $this->GetOrCreateConfrontationTeamIfNotExist([
            'confrontation_id'  => $confrontation->id,
            'team_id'           => $team->id,
            'position'          => $position,
            'rating'            => $bet,
            'result'            => $result
        ]);
    }

    private function GetOrCreateTeamIfNotExist(string $name)
    {
        $team = Team::where('name', '=', $name)->first();
        if (!$team)
        {
            $team = Team::create(['name' => $name]);
        }
        return $team;
    }

    private function GetOrCreateConfrontationTeamIfNotExist(array $data)
    {
        $team = ConfrontationTeam::where('confrontation_id' , '=', $data['confrontation_id'])
            ->where('team_id' , '=', $data['team_id'])
            ->first();
        if (!$team)
        {
            $team = ConfrontationTeam::create($data);
        }
        return $team;
    }
}
