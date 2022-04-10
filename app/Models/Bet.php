<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{Factories\HasFactory, Model, Relations\BelongsTo};

class Bet extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'ticket_id',
        'confrontation_id',
        'team_id',
        'rating',
        'amount',
        'status',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'confrontation',
        'team',
    ];

    public function ticket() : BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    public function confrontation() : BelongsTo
    {
        return $this->belongsTo(Confrontation::class)->with('teams');
    }

    public function team() : BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
