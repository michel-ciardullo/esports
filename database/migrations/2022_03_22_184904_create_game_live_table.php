<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('game_live', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_id');
            $table->foreignId('live_id');
            $table->timestamps();

            $table->index(['game_id', 'live_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('game_live');
    }
};
