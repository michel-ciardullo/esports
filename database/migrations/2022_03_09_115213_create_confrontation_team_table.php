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
        Schema::create('confrontation_team', function (Blueprint $table) {
            $table->id();
            $table->foreignId('confrontation_id');
            $table->foreignId('team_id');
            $table->unsignedInteger('position');
            $table->unsignedDecimal('rating');
            $table->string('result');
            $table->timestamps();

            $table->index(['confrontation_id', 'team_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('confrontation_team');
    }
};
