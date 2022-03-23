<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{
    Factories\HasFactory,
    Model,
    Relations\BelongsTo
};

class Live extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'confrontation_id',
        'streamer',
        'streamer_link',
    ];

    public function confrontation() : BelongsTo
    {
        return $this->belongsTo(Confrontation::class);
    }
}
