<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Collection;

class Confrontation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'external_id',
        'tournament_id',
        'streamer',
        'streamer_link',
        'date',
        'time',
        'timezone',
        'status',
        'format',
        'streamer',
        'stream_link',
    ];

    /**
     * @return HasOne
     */
    public function game() : HasOne
    {
        return $this->hasOne(Game::class);
    }

    /**
     * @return BelongsTo
     */
    public function tournament() : BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }

    /**
     * @return BelongsToMany
     */
    public function teams() : BelongsToMany
    {
        return $this->belongsToMany(Team::class)->withPivot(['position', 'rating', 'result']);
    }

    /**
     * @param $yesterdayDateTime
     * @param $tomorrowDateTime
     * @return Builder
     */
    public static function buildQuery($yesterdayDateTime, $tomorrowDateTime) : Builder
    {
        return static::with('teams')
            ->leftJoin('tournaments', 'tournaments.id', '=', 'confrontations.tournament_id')
            ->whereDate('date', '>=', $yesterdayDateTime->format('Y-m-d'))
            ->whereDate('date', '<=', $tomorrowDateTime->format('Y-m-d'))
            ->where('status', '!=', 'cancelled')
            ->orderBy('tournaments.name');
    }

    /**
     * @param $yesterdayDateTime
     * @param $tomorrowDateTime
     * @return Collection
     */
    public static function getAll($yesterdayDateTime, $tomorrowDateTime) : Collection
    {
        return static::buildQuery($yesterdayDateTime, $tomorrowDateTime)
            ->select(array_merge(static::gameSelect(), static::tournamentAndConfrontationSelect()))
            ->leftJoin('games', 'games.id', '=', 'tournaments.game_id')
            ->orderBy('games.name')
            ->get();
    }

    /**
     * @param int $gameId
     * @param $yesterdayDateTime
     * @param $tomorrowDateTime
     * @return Collection
     */
    public static function getForOneGame(int $gameId, $yesterdayDateTime, $tomorrowDateTime) : Collection
    {
        return static::buildQuery($yesterdayDateTime, $tomorrowDateTime)
            ->select(static::tournamentAndConfrontationSelect())
            ->where('tournaments.game_id', '=', $gameId)
            ->get();
    }

    /**
     * @param int $tournamentId
     * @param $yesterdayDateTime
     * @param $tomorrowDateTime
     * @return Collection
     */
    public static function getForOneTournament(int $tournamentId, $yesterdayDateTime, $tomorrowDateTime) : Collection
    {
        return static::with('teams')
            ->whereDate('date', '>=', $yesterdayDateTime->format('Y-m-d'))
            ->whereDate('date', '<=', $tomorrowDateTime->format('Y-m-d'))
            ->where('tournament_id', '=', $tournamentId)
            ->get();
    }

    /**
     * @return string[]
     */
    private static function gameSelect() : array
    {
        return [
            'games.id as game_id',
            'games.name as game_name',
            'games.slug as game_slug',
        ];
    }

    /**
     * @return string[]
     */
    private static function tournamentAndConfrontationSelect() : array
    {
        return [
            'tournaments.id as tournament_id',
            'tournaments.name as tournament_name',
            'tournaments.slug as tournament_slug',

            'confrontations.*',
        ];
    }
}
