<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ESport extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'esports';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'matchid',
		'date',
		'time',
		'timezone',
		'game',
		'status',
		'opponent1',
		'opponent2',
		'tournament',
		'format',
		'bet1',
		'bet2',
		'result1',
		'result2',
		'streamer',
		'streamlink',
    ];
}
