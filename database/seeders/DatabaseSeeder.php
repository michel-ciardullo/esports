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
            ->count(4)
            ->state(new Sequence(
                ['name' => 'toto', 'email' => 'toto@local.dev', 'role' => 1],
                ['name' => 'vince', 'email' => 'vince@local.dev', 'role' => 1],
                ['name' => 'slava', 'email' => 'slava@local.dev', 'role' => 1],
                ['name' => 'user', 'email' => 'user@local.dev'],
            ))
            ->create();
    }
}
