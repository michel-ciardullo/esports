<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\{
    Eloquent\Factories\Sequence,
    Seeder
};

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()
            ->count(3)
            ->state(new Sequence(
                ['name' => 'toto', 'email' => 'toto@local.dev'],
                ['name' => 'vince', 'email' => 'vince@local.dev'],
                ['name' => 'slava', 'email' => 'slava@local.dev'],
            ))
            ->create();
    }
}
