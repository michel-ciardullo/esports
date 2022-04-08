<?php

namespace App\Http\Controllers\ESport;

use App\Http\Controllers\Controller;
use App\Models\{Confrontation, Game, Tournament};
use Illuminate\Support\Carbon;
use Inertia\{
    Inertia,
    Response
};

class ESportController extends Controller
{
    private Carbon $yesterdayDateTime;
    private Carbon $todayDateTime;
    private Carbon $tomorrowDateTime;

    /**
     * Constructor ESportController
     */
    public function __construct()
    {
        $this->yesterdayDateTime    = Carbon::yesterday();
        $this->todayDateTime        = Carbon::now();
        $this->tomorrowDateTime     = Carbon::tomorrow();
    }

    /**
     * @return Response
     */
    public function index() : Response
    {
        $confrontations = Confrontation::getAll($this->yesterdayDateTime, $this->tomorrowDateTime);

        $esports            = [];

        $gameIndexes        = [];
        $tournamentIndexes  = [];

        foreach ($confrontations as $confrontation)
        {
            if (empty($confrontation->teams[0]->pivot->rating) || empty($confrontation->teams[1]->pivot->rating))
            {
                continue;
            }

            // Add game to indexes
            $gameId = $confrontation->game_id;
            if (!array_key_exists($gameId, $gameIndexes))
            {
                $gameIndex              = count($gameIndexes);
                $gameIndexes[$gameId]   = $gameIndex;

                $tournamentIndexes[$gameId] = [
                    'yesterday' => [],
                    'now'       => [],
                    'today'     => [],
                    'tomorrow'  => []
                ];
            }
            else
            {
                $gameIndex = $gameIndexes[$gameId];
            }

            // Add game to list if not exist
            if (!array_key_exists($gameIndex, $esports))
            {
                $esports[$gameIndex] = [
                    'id'            => $confrontation->game_id,
                    'name'          => $confrontation->game_name,
                    'slug'          => $confrontation->game_slug,

                    'tournaments'   => [
                        'yesterday' => [],
                        'now'       => [],
                        'today'     => [],
                        'tomorrow'  => []
                    ]
                ];
            }

            $tournamentDay  = $this->getConfrontationDay($confrontation);
            $tournamentId   = $confrontation->tournament_id;

            if (!array_key_exists($tournamentId, $tournamentIndexes[$gameId][$tournamentDay]))
            {
                $tournamentIndex = count($tournamentIndexes[$gameId][$tournamentDay]);
                $tournamentIndexes[$gameId][$tournamentDay][$tournamentId] = $tournamentIndex;
            }
            else
            {
                $tournamentIndex = $tournamentIndexes[$gameId][$tournamentDay][$tournamentId];
            }

            if (!array_key_exists($tournamentIndex, $esports[$gameIndex]['tournaments'][$tournamentDay]))
            {
                $esports[$gameIndex]['tournaments'][$tournamentDay][$tournamentIndex] = [
                    'id'                => $confrontation->tournament_id,
                    'name'              => $confrontation->tournament_name,
                    'slug'              => $confrontation->tournament_slug,
                    'confrontations'    => []
                ];
            }

            $esports[$gameIndex]['tournaments'][$tournamentDay][$tournamentIndex]['confrontations'][] = [
                'id' => $confrontation->id,
                'status' => $confrontation->status,
                'date' => $confrontation->date,
                'timezone' => $confrontation->timezone,
                'time' => $confrontation->time,
                'stream_link' => $confrontation->stream_link,
                'streamer' => $confrontation->streamer,
                'format' => $confrontation->format,
                'teams' => $confrontation->teams,
            ];
        }

        return Inertia::render('ESport/Index', compact('esports'));
    }

    /**
     * Show tournaments for game.
     *
     * @param string $slug
     * @return Response
     */
    public function game(string $slug) : Response
    {
        $game           = Game::where('slug', '=', $slug)->firstOrFail();
        $confrontations = Confrontation::getForOneGame($game->id, $this->yesterdayDateTime, $this->tomorrowDateTime);

        $esport = [
            'id'    => $game->id,
            'name'  => $game->name,
            'slug'  => $game->slug,

            'tournaments' => [
                'yesterday' => [],
                'now'       => [],
                'today'     => [],
                'tomorrow'  => [],
            ]
        ];

        $tournamentIndexes  = [];

        foreach ($confrontations as $confrontation)
        {
            if (empty($confrontation->teams[0]->pivot->rating) || empty($confrontation->teams[1]->pivot->rating))
            {
                continue;
            }

            $tournamentDay  = $this->getConfrontationDay($confrontation);
            $tournamentId   = $confrontation->tournament_id;

            if (!array_key_exists($tournamentDay, $tournamentIndexes))
            {
                $tournamentIndexes[$tournamentDay] = [];
            }

            if (!array_key_exists($tournamentId, $tournamentIndexes[$tournamentDay]))
            {
                $tournamentIndex = count($tournamentIndexes[$tournamentDay]);
                $tournamentIndexes[$tournamentDay][$tournamentId] = $tournamentIndex;
            }
            else
            {
                $tournamentIndex = $tournamentIndexes[$tournamentDay][$tournamentId];
            }

            if (!array_key_exists($tournamentIndex, $esport['tournaments'][$tournamentDay]))
            {
                $esport['tournaments'][$tournamentDay][$tournamentIndex] = [
                    'id'                => $confrontation->tournament_id,
                    'name'              => $confrontation->tournament_name,
                    'slug'              => $confrontation->tournament_slug,
                    'confrontations'    => []
                ];
            }

            $esport['tournaments'][$tournamentDay][$tournamentIndex]['confrontations'][] = [
                'id' => $confrontation->id,
                'status' => $confrontation->status,
                'date' => $confrontation->date,
                'timezone' => $confrontation->timezone,
                'time' => $confrontation->time,
                'stream_link' => $confrontation->stream_link,
                'streamer' => $confrontation->streamer,
                'format' => $confrontation->format,
                'teams' => $confrontation->teams,
            ];
        }

        return Inertia::render('ESport/Game', compact('esport'));
    }

    /**
     * Show confrontations for tournament.
     *
     * @param string $gameSlug
     * @param string $tournamentSlug
     * @return Response
     */
    public function tournament(string $gameSlug, string $tournamentSlug) : Response
    {
        $game           = Game::where('slug', '=', $gameSlug)->firstOrFail();
        $tournament     = Tournament::where('slug', '=', $tournamentSlug)->where('game_id', '=', $game->id)->firstOrFail();
        $confrontations = Confrontation::getForOneTournament($tournament->id, $this->yesterdayDateTime, $this->tomorrowDateTime);

        $esport = [
            'id'    => $game->id,
            'name'  => $game->name,
            'slug'  => $game->slug,

            'tournaments' => [
                'yesterday' => [],
                'now'       => [],
                'today'     => [],
                'tomorrow'  => [],
            ]
        ];

        foreach ($confrontations as $confrontation)
        {
            if (empty($confrontation->teams[0]->pivot->rating) || empty($confrontation->teams[1]->pivot->rating))
            {
                continue;
            }

            $tournamentDay  = $this->getConfrontationDay($confrontation);

            if (!array_key_exists(0, $esport['tournaments'][$tournamentDay]))
            {
                $esport['tournaments'][$tournamentDay][0] = [
                    'id'                => $tournament->id,
                    'name'              => $tournament->name,
                    'slug'              => $tournament->slug,
                    'confrontations'    => []
                ];
            }

            $esport['tournaments'][$tournamentDay][0]['confrontations'][] = [
                'id' => $confrontation->id,
                'status' => $confrontation->status,
                'date' => $confrontation->date,
                'timezone' => $confrontation->timezone,
                'time' => $confrontation->time,
                'stream_link' => $confrontation->stream_link,
                'streamer' => $confrontation->streamer,
                'format' => $confrontation->format,
                'teams' => $confrontation->teams,
            ];
        }

        return Inertia::render('ESport/Tournament', compact('esport'));
    }

    /**
     * Show confrontation.
     *
     * @param string $gameSlug
     * @param string $tournamentSlug
     * @param int $confrontationId
     * @return Response
     */
    public function confrontation(string $gameSlug, string $tournamentSlug, int $confrontationId) : Response
    {
        $game           = Game::where('slug', '=', $gameSlug)->firstOrFail();
        $tournament     = Tournament::where('slug', '=', $tournamentSlug)->where('game_id', '=', $game->id)->firstOrFail();
        $confrontation  = Confrontation::findOrFail($confrontationId);

        $esport = [
            'name'  => $game->name,
            'slug'  => $game->slug,

            'tournaments' => [
                'yesterday' => [],
                'now'       => [],
                'today'     => [],
                'tomorrow'  => [],
            ]
        ];

        $tournamentDay  = $this->getConfrontationDay($confrontation);

        $esport['tournaments'][$tournamentDay][0] = [
            'id'                => $tournament->id,
            'name'              => $tournament->name,
            'slug'              => $tournament->slug,
            'confrontations'    => []
        ];

        $esport['tournaments'][$tournamentDay][0]['confrontations'][] = [
            'id' => $confrontation->id,
            'status' => $confrontation->status,
            'date' => $confrontation->date,
            'timezone' => $confrontation->timezone,
            'time' => $confrontation->time,
            'stream_link' => $confrontation->stream_link,
            'streamer' => $confrontation->streamer,
            'format' => $confrontation->format,
            'teams' => $confrontation->teams,
        ];

        return Inertia::render('ESport/Confrontation', compact('esport'));
    }

    /**
     * Get confrontation day.
     *
     * @param $confrontation
     * @return string|null
     */
    private function getConfrontationDay($confrontation) : string | null
    {
        $confrontationDateTime  = Carbon::createFromDate($confrontation->date)->format('Y-m-d');

        if ($confrontationDateTime === $this->yesterdayDateTime->format('Y-m-d'))
        {
            return 'yesterday';
        }
        else if ($confrontationDateTime === $this->todayDateTime->format('Y-m-d'))
        {
            if ($this->isTheConfrontationWithTheLiveStatus($confrontation))
            {
                return 'now';
            }

            return 'today';
        }
        else if ($confrontationDateTime === $this->tomorrowDateTime->format('Y-m-d'))
        {
            return 'tomorrow';
        }

        return null;
    }

    /**
     * Is the confrontation with the live status
     *
     * @param $confrontation
     * @return string
     */
    private function isTheConfrontationWithTheLiveStatus($confrontation) : string
    {
        if ($confrontation->status === 'live')
        {
            $confrontationTime = Carbon::createFromTimeString($confrontation->time);

            return $confrontationTime->timestamp <= $this->todayDateTime->timestamp
                && !empty($confrontation->streamer) && !empty($confrontation->stream_link);
        }

        return false;
    }
}
