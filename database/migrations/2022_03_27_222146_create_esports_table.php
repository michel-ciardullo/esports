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
        Schema::create('esports', function (Blueprint $table) {
            $table->id();
            $table->string('matchid');
            $table->dateTime('date');
            $table->time('time');
            $table->string('timezone');
            $table->string('game');
            $table->string('status');

            $table->string('opponent1');
            $table->string('opponent2');

            $table->string('tournament');
            $table->string('format');

            $table->string('bet1');
            $table->string('bet2');

            $table->string('result1');
            $table->string('result2');

            $table->string('streamer');
            $table->string('streamlink');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('esports');
    }
};
