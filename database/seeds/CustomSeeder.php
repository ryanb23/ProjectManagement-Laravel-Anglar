<?php

use Illuminate\Database\Seeder;

class CustomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('labels')->insert([
            'id' => 1,
            'name' => 'Undefined',
            'color' => 'red'
        ]);

        DB::table('departments')->insert([
            'id' => 1,
            'p_dep_id' => 0,
            'name' => 'IT',
            'description' => 'des'
        ]);
        DB::table('departments')->insert([
            'id' => 2,
            'p_dep_id' => 1,
            'name' => 'QA',
            'description' => 'des'
        ]);
    }
}
