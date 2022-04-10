<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;
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
            ->select(array_merge(static::gameSelect(), static::tournamentSelect(), static::confrontationSelect()))
            ->leftJoin('tournaments', 'tournaments.id', '=', 'confrontations.tournament_id')
            ->leftJoin('games', 'games.id', '=', 'tournaments.game_id')
            ->whereDate('date', '>=', $yesterdayDateTime->format('Y-m-d'))
            ->whereDate('date', '<=', $tomorrowDateTime->format('Y-m-d'))
            ->where('status', '!=', 'cancelled');
    }

    /**
     * @param $yesterdayDateTime
     * @param $tomorrowDateTime
     * @return Collection
     */
    public static function getAll($yesterdayDateTime, $tomorrowDateTime) : Collection
    {
        return static::buildQuery($yesterdayDateTime, $tomorrowDateTime)
            ->orderBy('games.name')
            ->get();
    }

    /**
     * @param string $gameSlug
     * @param $yesterdayDateTime
     * @param $tomorrowDateTime
     * @return Collection
     */
    public static function getForOneGame(string $gameSlug, $yesterdayDateTime, $tomorrowDateTime) : Collection
    {
        return static::buildQuery($yesterdayDateTime, $tomorrowDateTime)
            ->where('games.slug', '=', $gameSlug)
            ->orderBy('tournaments.name')
            ->get();
    }

    /**
     * @param string $gameSlug
     * @param string $tournamentSlug
     * @param $yesterdayDateTime
     * @param $tomorrowDateTime
     * @return Collection
     */
    public static function getForOneTournament(string $gameSlug, string $tournamentSlug, $yesterdayDateTime, $tomorrowDateTime) : Collection
    {
        return static::buildQuery($yesterdayDateTime, $tomorrowDateTime)
            ->where('games.slug', '=', $gameSlug)
            ->where('tournaments.slug', '=', $tournamentSlug)
            ->get();
    }

    /**
     * @param string $gameSlug
     * @param string $tournamentSlug
     * @param int $id
     * @param $yesterdayDateTime
     * @param $tomorrowDateTime
     * @return Collection
     */
    public static function getForOneConfrontation(string $gameSlug, string $tournamentSlug, int $id, $yesterdayDateTime, $tomorrowDateTime) : Collection
    {
        return static::buildQuery($yesterdayDateTime, $tomorrowDateTime)
            ->where('games.slug', '=', $gameSlug)
            ->where('tournaments.slug', '=', $tournamentSlug)
            ->where('confrontations.id', '=', $id)
            ->get();
    }

    /**
     * @param int[] $confrontationIds
     * @return Collection
     */
    public static function getForTicket(array $confrontationIds) : Collection
    {
        return static::with('teams')
            ->select(array_merge(static::gameSelect(), static::tournamentSelect(), static::confrontationSelect()))
            ->leftJoin('tournaments', 'tournaments.id', '=', 'confrontations.tournament_id')
            ->leftJoin('games', 'games.id', '=', 'tournaments.game_id')
            ->whereIn('confrontations.id', $confrontationIds)
            ->get();
    }

    /**
     * Get confrontation day.
     *
     * @param Carbon $yesterdayDateTime
     * @param Carbon $todayDateTime
     * @param Carbon $tomorrowDateTime
     * @return string|null
     */
    public function getConfrontationDay(Carbon $yesterdayDateTime, Carbon $todayDateTime, Carbon $tomorrowDateTime) : string | null
    {
        $confrontationDateTime  = Carbon::createFromDate($this->date)->format('Y-m-d');

        if ($confrontationDateTime === $yesterdayDateTime->format('Y-m-d'))
        {
            return 'yesterday';
        }
        else if ($confrontationDateTime === $todayDateTime->format('Y-m-d'))
        {
            if ($this->isTheConfrontationWithTheLiveStatus($todayDateTime))
            {
                return 'now';
            }

            return 'today';
        }
        else if ($confrontationDateTime === $tomorrowDateTime->format('Y-m-d'))
        {
            return 'tomorrow';
        }

        return null;
    }

    /**
     * Is the confrontation with the live status
     *
     * @param Carbon $todayDateTime
     * @return string
     */
    private function isTheConfrontationWithTheLiveStatus(Carbon $todayDateTime) : string
    {
        if ($this->status === 'live')
        {
            $confrontationTime = Carbon::createFromTimeString($this->time);

            return $confrontationTime->timestamp <= $todayDateTime->timestamp
                && !empty($this->streamer) && !empty($this->stream_link);
        }

        return false;
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
    private static function tournamentSelect() : array
    {
        return [
            'tournaments.id as tournament_id',
            'tournaments.name as tournament_name',
            'tournaments.slug as tournament_slug',
        ];
    }

    /**
     * @return string[]
     */
    private static function confrontationSelect() : array
    {
        return [
            'confrontations.*',
        ];
    }
}
