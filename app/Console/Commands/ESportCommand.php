<?php

namespace App\Console\Commands;

use App\Models\Game;
use App\Models\Team;
use App\Models\Tournament;
use App\Models\TournamentMatch;
use App\Models\TournamentTeam;
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
     */
    public function handle()
    {
        $response = $this->fetchApi();
        if ($response)
            $this->callbaclApi($response);
        return 0;
    }

    private function fetchApi(array $data = [])
    {
        // Build url with query params
        $url    = 'https://esport-api.com/api/v2/';
        $params = array_merge([
            'token' => 'jtu2hPhuCOyqFt7HeteQ1mItSFvjnIxw'
        ], $data);

        $query = http_build_query($params);
        $url = sprintf('%s?%s', $url, $query);
        $this->comment($url);

        // fetch request with curl
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);

        return $response ? json_decode($response) : false;
    }

    private function callbaclApi(array $response)
    {
        foreach ($response as $data) {
            // Game
            $game = $this->GetOrCreateGameIfNotExist($data->game);
            $this->comment($game->toJson());

            // Tournament
            $tournament = $this->GetOrCreateTournamentIfNotExist($game->id, $data->tournament, $data->format);
            $this->comment($tournament->toJson());

            // Match
            $match = $this->GetOrCreateMatchIfNotExist([
                'external_id'   => $data->id,
                'tournament_id' => $tournament->id,
                'streamer'      => $data->streamer ?? null,
                'streamer_link' => $data->streamer_link ?? null,
                'date'          => $data->date,
                'time'          => $data->time,
                'timezone'      => $data->timezone,
                'status'        => $data->status
            ]);
            $this->comment($match->toJson());

            // Team 1
            $tournamentTeam1 = $this->GetOrCreateTeam($data->opponent1, $tournament->id, $data->bet1, $data->result1);
            $this->comment($tournamentTeam1);

            // Team 2
            $tournamentTea2 = $this->GetOrCreateTeam($data->opponent2, $tournament->id, $data->bet2, $data->result2);
            $this->comment($tournamentTea2);

            $this->comment(PHP_EOL);
        }
    }

    private function GetOrCreateGameIfNotExist(string $name) {
        $game = Game::where('name' , '=', $name)->first();
        if (!$game)
            $game = Game::create(['name' => $name]);
        return $game;
    }

    private function GetOrCreateTournamentIfNotExist(int $gameId, string $name, string $format) {
        $tournament = Tournament::where('name' , '=', $name)->where('game_id' , '=', $gameId)->first();
        if (!$tournament)
            $tournament = Tournament::create([
                'game_id' => $gameId,
                'format' => $format,
                'name' => $name
            ]);
        return $tournament;
    }

    private function GetOrCreateMatchIfNotExist(array $data) {
        $match = TournamentMatch::where('external_id' , '=', $data['external_id'])->first();
        if (!$match)
            $match = TournamentMatch::create($data);
        return $match;
    }

    private function GetOrCreateTeamIfNotExist(string $name) {
        $team = Team::where('name' , '=', $name)->first();
        if (!$team)
            $team = Team::create(['name' => $name]);
        return $team;
    }

    private function GetOrCreateTournamentTeamIfNotExist(array $data) {
        $team = TournamentTeam::where('tournament_id' , '=', $data['tournament_id'])
            ->where('team_id' , '=', $data['team_id'])
            ->first();

        if (!$team)
            $team = TournamentTeam::create($data);
        return $team;
    }

    private function GetOrCreateTeam(string $name, int $tournamentId, string $bet, string $result) {
        // Team
        $team = $this->GetOrCreateTeamIfNotExist($name);
        $this->comment($team);

        return $this->GetOrCreateTournamentTeamIfNotExist([
            'tournament_id' => $tournamentId,
            'team_id'       => $team->id,
            'bet'           => $bet,
            'result'        => $result
        ]);
    }
}
