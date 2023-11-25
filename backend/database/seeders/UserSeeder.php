<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::firstOrCreate([
            'email' => 'admin@email.com'
        ], [
            'name' => 'Superadmin',
            'password' => Hash::make('12345')
        ]);
    }
}
