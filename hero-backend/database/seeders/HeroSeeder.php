<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Hero;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class HeroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        Hero::factory()
            ->count(50)
            ->create();


        // DB::table('heroes')->insert([
        //     'name' => Str::random(10)
        // ]);
    }
}
