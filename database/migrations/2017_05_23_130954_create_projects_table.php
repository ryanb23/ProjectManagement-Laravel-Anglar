<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('creator_id')->unsigned();
            $table->integer('department_id')->unsigned();
            $table->integer('status_id')->unsigned();
            $table->string('title');
            $table->string('objective');
            $table->text('description');

            $table->foreign('creator_id')->references('id')->on('users');

            $table->foreign('department_id')->references('id')->on('departments');

            $table->foreign('status_id')->references('id')->on('project_statuses');

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
        Schema::drop('projects');
    }
}
