<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Tournament extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'game_id',
        'format'
    ];

    /**
     * The tournaments that belong to the team.
     *
     * @return BelongsToMany
     */
    public function teams() : BelongsToMany
    {
        return $this->belongsToMany(Team::class)
            ->using(TournamentTeam::class);
    }

    public function matches() : HasMany
    {
        return $this->HasMany(TournamentMatch::class);
    }

    public function game() : HasOne
    {
        return $this->hasOne(Game::class);
    }
}
