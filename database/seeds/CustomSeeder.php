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
    }
}
