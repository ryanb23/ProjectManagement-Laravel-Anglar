<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_settings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->unique();
            $table->enum('post',['1','0'])->default('0');
            $table->enum('upvote',['1','0'])->default('0');
            $table->enum('comment',['1','0'])->default('0');
            $table->enum('popular',['1','0'])->default('0');
            $table->enum('approved',['1','0'])->default('0');
            $table->enum('dismissed',['1','0'])->default('0');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user_settings');
    }
}
