<?php

namespace App\Http\Requests\Profile;

use App\Rules\Profile\MatchOldPassword;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class ProfileUpdateSecurityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() : bool
    {
        return Auth::guard('web')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return string[][]
     */
    public function rules() : array
    {
        return [
            'current_password'  => ['required', 'string', new MatchOldPassword],
            'password'          => ['confirmed', Password::defaults()],
        ];
    }
}
