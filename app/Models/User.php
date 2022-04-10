<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as AuthUserModel;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends AuthUserModel implements MustVerifyEmail
{
    use HasApiTokens,
        HasFactory,
        Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['wallet', 'tickets'];

    public static function booted()
    {
        static::created(function($model) {
            $model->wallet()->forceCreate([
                'user_id' => $model->id
            ]);
        });
    }

    /**
     * Get the wallet associated with the user.
     *
     * @return HasOne
     */
    public function wallet() : HasOne
    {
        return $this->hasOne(Wallet::class);
    }

    public function tickets() : HasMany
    {
        return $this->hasMany(Ticket::class)
            ->where('status', '=', Ticket::STATUS_ACTIVE)
            ->orderByDesc('id');
    }
}
