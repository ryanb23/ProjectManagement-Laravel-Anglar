<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('oauth_provider')->nullable();
            $table->string('oauth_provider_id')->nullable();
            $table->string('name')->unique();
            $table->string('email')->unique();
            $table->string('password', 60);
            $table->string('avatar')->nullable();
            $table->string('firstname',30);
            $table->string('lastname',30);
            $table->text('about_me');
            $table->integer('score');
            $table->string('salt');
            $table->enum('active',['1','0'])->default('1');
            $table->enum('email_verified', ['1', '0'])->default('0');
            $table->string('email_verification_code', 60)->nullable();
            $table->rememberToken();
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
        Schema::drop('users');
    }
}
