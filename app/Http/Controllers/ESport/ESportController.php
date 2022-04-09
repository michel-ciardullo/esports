<?php

namespace App\Http\Controllers\ESport;

use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;

class ESportController extends Controller
{
    protected Carbon $yesterdayDateTime;
    protected Carbon $todayDateTime;
    protected Carbon $tomorrowDateTime;

    /**
     * Constructor ESportController
     */
    public function __construct()
    {
        $this->yesterdayDateTime    = Carbon::yesterday();
        $this->todayDateTime        = Carbon::now();
        $this->tomorrowDateTime     = Carbon::tomorrow();
    }
}
