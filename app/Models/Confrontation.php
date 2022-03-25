<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
        'status'
    ];

    public function game() : HasOne
    {
        return $this->hasOne(Game::class);
    }

    /**
     * @return HasOne
     */
    public function live() : HasOne
    {
        return $this->hasOne(Live::class);
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
        return $this->belongsToMany(Team::class)
            ->withPivot(['position', 'rating', 'result']);
    }
}
