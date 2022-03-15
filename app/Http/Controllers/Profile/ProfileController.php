<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\ProfileUpdateInformationRequest;
use App\Models\User;
use Illuminate\Http\Request;
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

    public function updateInformations(ProfileUpdateInformationRequest $request)
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
}
