<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    use HasFactory;

    const STATUS_ACTIVE     = 'active';
    const STATUS_CANCELLED  = 'cancelled';
    const STATUS_RIPPED     = 'ripped';
    const STATUS_PAID       = 'paid';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'user_id',
        'status',
        'type',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['activeBets'];

    public static function getStatusList() : array
    {
        return [
            self::STATUS_ACTIVE     => 'Active',
            self::STATUS_CANCELLED  => 'Annulé',
            self::STATUS_RIPPED     => 'Déchiré',
            self::STATUS_PAID       => 'Réglé',
        ];
    }

    public function bets() : HasMany
    {
        return $this->hasMany(Bet::class);
    }

    public function activeBets()
    {
        return $this->bets()->where('status', '=', 'active');
    }

}
