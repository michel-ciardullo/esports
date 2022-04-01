<?php

namespace App\Http\Requests\FAQ;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class FAQRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() : bool
    {
        $guard = Auth::guard('web');
        return $guard->check() && $guard->user()->role === User::ROLE_ADMIN;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() : array
    {
        return [
            'question' => ['required','string','between:1,255'],
            'answer' => ['required','string','between:1,255']
        ];
    }
}
