<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class TournamentTeam extends Pivot
{
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'tournament_id',
        'team_id',
        'bet',
        'result'
    ];
}
