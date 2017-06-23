<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('todo_list_id')->unsigned();
            $table->string('title');
            $table->text('description');
            $table->date('deadline');
            $table->integer('assign_type');
            $table->integer('contributor_id')->unsigned()->nullable();
            $table->integer('department_id')->unsigned()->nullable() ;
            $table->string('submit_title');
            $table->string('submit_description');
            $table->enum('is_approved',['0','1','2'])->default('0');
            $table->timestamps();

            $table->foreign('todo_list_id')->references('id')->on('todo_lists')->onDelete('cascade');
            $table->foreign('contributor_id')->references('id')->on('users');
            $table->foreign('department_id')->references('id')->on('departments');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tasks');
    }
}
