<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubDepartmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sub_departments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('p_dep_id')->unsigned();
            $table->string('description');
            $table->string('name')->unique();
            $table->enum('active',['1','0'])->default('1');
            $table->timestamps();

            $table->foreign('p_dep_id')
            ->references('id')->on('departments');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('sub_departments');
    }
}
