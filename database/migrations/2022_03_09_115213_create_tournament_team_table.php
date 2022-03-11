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
        Schema::create('tournament_team', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tournament_id');
            $table->foreignId('team_id');
            $table->string('bet');
            $table->string('result');
            $table->timestamps();

            $table->index(['tournament_id', 'team_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tournament_team');
    }
};
