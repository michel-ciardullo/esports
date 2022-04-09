<?php

namespace App\Collections\ESport;

use Illuminate\Support\Collection;

/**
 * @template TKey of array-key
 * @template TValue
 */
class IndexesCollection extends Collection
{
    // Stocke-les indexes des jeux.
    protected array $indexes = [];

    protected function hasIndexes($key) : bool
    {
        return array_key_exists($key, $this->indexes);
    }

    protected function setIndexes($key) : void
    {
        $index = count($this->indexes);
        $this->indexes[$key] = $index;
    }

    protected function getIndexes($key) : int
    {
        return $this->indexes[$key];
    }

    protected function getOrCreate($key) : int
    {
        // Si l'id de l'item exist dans la list indexes.
        if (!$this->hasIndexes($key))
        {
            // Ajoute l'id du jeu dans la list indexes.
            $this->setIndexes($key);
        }

        // Récupère l'index dans la list.
        return $this->getIndexes($key);
    }
}
