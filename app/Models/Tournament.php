<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Model,
    Relations\HasMany,
    Relations\HasOne
};

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
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['confrontations'];

    /**
     * @return HasOne
     */
    public function game() : HasOne
    {
        return $this->hasOne(Game::class);
    }

    /**
     * @return HasMany
     */
    public function confrontations() : HasMany
    {
        return $this->HasMany(Confrontation::class);
    }
}
