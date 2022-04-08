<?php

namespace App\Listeners;

use App\Events\EADataApiEvent;
use App\Models\Confrontation;
use App\Models\ConfrontationTeam;
use App\Models\Game;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EADataApiListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param EADataApiEvent $event
     * @return void
     */
    public function handle(EADataApiEvent $event) : void
    {
        foreach ($event->data as $data)
        {
            DB::transaction(function () use ($data)
            {
                // Game
                $game = Game::where('name' , '=', $data->game)
                    ->firstOrCreate([
                        'name' => $data->game,
                        'slug' => Str::slug($data->game),
                    ]);

                // Tournament
                $tournament = Tournament::where('name' , '=', $data->tournament)
                    ->where('game_id' , '=', $game->id)
                    ->firstOrCreate([
                        'game_id'   => $game->id,
                        'name'      => $data->tournament,
                        'slug'      => Str::slug($data->tournament),
                    ]);

                // Confrontation
                $confrontation = $this->handleConfrontation([
                    'external_id'   => $data->id,
                    'tournament_id' => $tournament->id,
                    'date'          => $data->date,
                    'time'          => $data->time,
                    'timezone'      => $data->timezone,
                    'status'        => $data->status,
                    'format'        => $data->format,
                    'streamer'      => $data->streamer ?? null,
                    'stream_link'   => $data->streamlink ?? null,
                ]);

                // Team 1/2
                $this->handleTeam($confrontation, $data->opponent1, floatval($data->bet1), $data->result1, 1);
                $this->handleTeam($confrontation, $data->opponent2, floatval($data->bet2), $data->result2, 2);
            });
        }
    }

    private function handleConfrontation(array $data)
    {
        $confrontation = Confrontation::where('external_id' , '=', $data['external_id'])->first();
        if (!$confrontation)
        {
            $confrontation = Confrontation::create($data);
        }
        else
        {
            $confrontation->update([
                'date'          => $data['date'],
                'time'          => $data['time'],
                'timezone'      => $data['timezone'],
                'status'        => $data['status'],
                'format'        => $data['format'],
                'streamer'      => $data['streamer'],
                'stream_link'   => $data['stream_link'],
            ]);
        }

        return $confrontation;
    }

    private function handleTeam(Confrontation $confrontation, string $name, float $bet, string $result, int $position)
    {
        $team = Team::where('name', '=', $name)
            ->firstOrCreate([
                'name' => $name,
                'slug' => Str::slug($name),
            ]);

        ConfrontationTeam::where('confrontation_id', '=', $confrontation->id)
            ->where('team_id', '=', $team->id)
            ->firstOrCreate([
                'confrontation_id' => $confrontation->id,
                'team_id' => $team->id,
                'position' => $position,
                'rating' => $bet,
                'result' => $result
            ]);
    }
}
