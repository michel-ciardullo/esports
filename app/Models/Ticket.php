<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    use HasFactory;

    const STATUS_WINNER     = 'winner';
    const STATUS_LOSER      = 'loser';
    const STATUS_CANCEL     = 'cancel';
    const STATUS_WITHDRAW   = 'withdraw';
    const STATUS_ACTIVE     = 'active';

    const STATUS_TORN       = 'torn';
    const STATUS_AVAILABLE  = 'available';
    const STATUS_EXCHANGED  = 'exchanged';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'user_id',
        'total_amount',
        'total_rating',
        'status',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['bets'];

    public static function getStatusList() : array
    {
        return [
            self::STATUS_WINNER => 'Winner',
            self::STATUS_LOSER => 'Loser',
            self::STATUS_CANCEL => 'Cancel',
            self::STATUS_WITHDRAW => 'Withdraw',
            self::STATUS_ACTIVE => 'Active',
        ];
    }

    public function bets() : HasMany
    {
        return $this->hasMany(Bet::class);
    }

}
