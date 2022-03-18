<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ConfrontationTeam extends Pivot
{
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'confrontation_id',
        'team_id',
        'bet',
        'result'
    ];
}
