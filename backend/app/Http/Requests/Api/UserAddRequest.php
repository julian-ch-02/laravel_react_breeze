<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UserAddRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'     => 'required',
            'email' => 'required|lowercase|unique:users',
            'password' => 'required|min:6'
        ];
    }
}
