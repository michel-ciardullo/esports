<?php

namespace App\Collections\ESport\ESport;

use App\Collections\ESport\IndexesCollection;
use App\Models\Confrontation;
use Illuminate\Support\Carbon;
use function route;

/**
 * @template TKey of array-key
 * @template TValue
 */
class TournamentCollection extends IndexesCollection
{
    protected Carbon $yesterdayDateTime;
    protected Carbon $todayDateTime;
    protected Carbon $tomorrowDateTime;

    /**
     * Create a new collection.
     *
     * @return void
     */
    public function __construct()
    {
        $this->indexes = [
            'yesterday' => [],
            'now' => [],
            'today'  => [],
            'tomorrow' => []
        ];

        $this->yesterdayDateTime    = Carbon::yesterday();
        $this->todayDateTime        = Carbon::now();
        $this->tomorrowDateTime     = Carbon::tomorrow();

        parent::__construct($this->indexes);
    }

    /**
     * Add an item to the collection.
     *
     * @param  Confrontation $item
     * @return $this
     */
    public function addFromDay(Confrontation $item) : self
    {
        $confrontationDay   = $item->getConfrontationDay($this->yesterdayDateTime, $this->todayDateTime, $this->tomorrowDateTime);
        $tournamentId       = $item->tournament_id;

        $tournamentIndex = $this->getOrCreateWithDay($confrontationDay, $tournamentId);

        if (!array_key_exists($tournamentIndex, $this->items[$confrontationDay]))
        {
            $this->items[$confrontationDay][$tournamentIndex] = [
                'id'                => $item->tournament_id,
                'name'              => $item->tournament_name,
                'slug'              => $item->tournament_slug,
                'confrontations'    => [],
                'link'              => route('esports.tournament', [
                    $item->game_slug,
                    $item->tournament_slug,
                ]),
            ];
        }

        $this->items[$confrontationDay][$tournamentIndex]['confrontations'][] = [
            'id' => $item->id,
            'status' => $item->status,
            'date' => $item->date,
            'timezone' => $item->timezone,
            'time' => $item->time,
            'stream_link' => $item->stream_link,
            'streamer' => $item->streamer,
            'format' => $item->format,
            'teams' => $item->teams,
            'link' => route('esports.confrontation', [
                $item->game_slug,
                $item->tournament_slug,
                $item->id,
            ])
        ];

        return $this;
    }

    protected function hasIndexesWithDay($day, $key) : int
    {
        return array_key_exists($day, $this->indexes) && array_key_exists($key, $this->indexes[$day]);
    }

    protected function setIndexesWithDay($day, $key) : void
    {
        $count = count($this->indexes[$day]);
        $this->indexes[$day][$key] = $count;
    }

    protected function getIndexesWithDay($day, $key) : int
    {
        return $this->indexes[$day][$key];
    }

    protected function getOrCreateWithDay($day, $key) : int
    {
        // Si l'id de l'item exist dans la list indexes.
        if (!$this->hasIndexesWithDay($day, $key))
        {
            // Ajoute l'id du jeu dans la list indexes.
            $this->setIndexesWithDay($day, $key);
        }

        // Récupère l'index dans la list.
        return $this->getIndexesWithDay($day, $key);
    }
}
