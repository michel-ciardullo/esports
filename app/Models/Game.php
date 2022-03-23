<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Model,
    Relations\BelongsToMany,
    Relations\HasMany
};

class Game extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'slug'
    ];

    public function tournaments() : HasMany
    {
        return $this->hasMany(Tournament::class);
    }

    public function lives() : BelongsToMany
    {
        return $this->belongsToMany(Live::class);
    }
}
