<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\ProfileUpdateInformationRequest;
use App\Http\Requests\Profile\ProfileUpdateSecurityRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * @return Response
     */
    public function index() : Response
    {
        return Inertia::render('Profile/Index');
    }

    /**
     * @param ProfileUpdateInformationRequest $request
     * @return RedirectResponse
     */
    public function updateInformations(ProfileUpdateInformationRequest $request) : RedirectResponse
    {
        $request->user()
            ->forceFill($request->all())
            ->save();

        return back(303)
            ->with('flash', [
                'status'    => 'success',
                'message'   => __('Les informations du profil on bien été mise à jour...')
            ]);
    }

    /**
     * @param ProfileUpdateSecurityRequest $request
     * @return RedirectResponse
     */
    public function updateSecurity(ProfileUpdateSecurityRequest $request) : RedirectResponse
    {
        $request->user()
            ->forceFill([
                'password' => Hash::make($request->input('password'))
            ])
            ->save();

        return back(303)
            ->with('flash', [
                'status'    => 'success',
                'message'   => __('Le mot de passe à bien été mise à jour...')
            ]);
    }

    /**
     * @param ProfileUpdateSecurityRequest $request
     * @return RedirectResponse
     */
    public function destroy(Request $request) : RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        $request->user()->delete();

        return  redirect('/')
            ->with('flash', [
                'status'    => 'success',
                'message'   => __('Le compte à bien été supprimer')
            ]);
    }
}
