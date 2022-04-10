<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{Factories\HasFactory, Model, Relations\BelongsTo};

class Bet extends Model
{
    use HasFactory;

    const STATUS_ACTIVE     = 'active';
    const STATUS_CANCELLED  = 'cancelled';
    const STATUS_WON        = 'won';
    const STATUS_LOST       = 'lost';
    const STATUS_PAID       = 'paid';

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

    public static function getStatusList() : array
    {
        return [
            self::STATUS_ACTIVE     => 'Active',
            self::STATUS_CANCELLED  => 'Annulé',
            self::STATUS_WON        => 'Gagné',
            self::STATUS_LOST       => 'Perdu',
            self::STATUS_PAID       => 'Réglé',
        ];
    }

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
