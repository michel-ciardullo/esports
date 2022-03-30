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
        Schema::create('confrontations', function (Blueprint $table) {
            $table->id();
            $table->string('external_id');
            $table->foreignId('tournament_id')->index();
            $table->date('date');
            $table->time('time');
            $table->string('timezone');
            $table->string('status');
            $table->string('format');
            $table->string('streamer')->nullable();
            $table->string('stream_link')->nullable();
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
        Schema::dropIfExists('confrontations');
    }
};
