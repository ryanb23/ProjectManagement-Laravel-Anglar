<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDepartmentPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('department_permissions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('dep_id')->unsigned();
            $table->integer('restricted_dep_id')->unsigned();
            $table->timestamps();

            $table->foreign('dep_id')
            ->references('id')->on('departments')->onDelete('cascade');

            $table->foreign('restricted_dep_id')
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
        Schema::drop('department_permissions');
    }
}
