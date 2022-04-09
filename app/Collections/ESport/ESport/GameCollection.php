<?php

namespace App\Collections\ESport\ESport;

use App\Collections\ESport\IndexesCollection;
use Illuminate\Contracts\Support\Arrayable;
use function route;

/**
 * @template TKey of array-key
 * @template TValue
 */
class GameCollection extends IndexesCollection
{
    /**
     * Create a new collection.
     *
     * @param  Arrayable<TKey, TValue>|iterable<TKey, TValue>|null  $items
     * @return void
     */
    public function __construct($items = [])
    {
        // Initialise la list esports.
        $esports = [];

        // Parcourir le tableau de donnée de jeu/tournoi/confrontation.
        foreach ($items as $item)
        {
            // Si l'une des deux team à une cote de 0.
            if (empty($item->teams[0]->pivot->rating) || empty($item->teams[1]->pivot->rating))
            {
                // Passé à la prochaine itération.
                continue;
            }

            // Stocke-l'id du jeu
            $gameId = $item->game_id;

            // Récupère l'index dans la list.
            $gameIndex = $this->getOrCreate($gameId);

            // Si l'index du jeu exist pas dans la list esports.
            if (!array_key_exists($gameIndex, $esports))
            {
                // Ajoute le jeu à la list esports.
                $esports[$gameIndex] = [
                    'id' => $item->game_id,
                    'name' => $item->game_name,
                    'slug' => $item->game_slug,
                    'tournaments' => new TournamentCollection(),
                    'link' => route('esports.game', [$item->game_slug]),
                ];
            }

            $esports[$gameIndex]['tournaments']->addFromDay($item);
        }

        parent::__construct($esports);
    }

    public function all() : array
    {
        return array_map(function ($item)  {
            return array_merge($item, ['tournaments' => $item['tournaments']->all()]);
        }, $this->items);
    }
}
