<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['teams'];

    /**
     * @return HasOne
     */
    public function tournament() : HasOne
    {
        return $this->hasOne(Tournament::class);
    }

    public function teams()
    {
        return $this->hasMany(ConfrontationTeam::class);
    }
}
