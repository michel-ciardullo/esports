<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SessionTicketController extends Controller
{
    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function add(Request $request) : RedirectResponse
    {
        // Récupère les données du formulaire.
        $confrontationId    = $request->get('confrontationId');
        $result             = $request->get('result');
        $redirect           = $request->get('redirect');

        // Récupère l'objet session dans l'objet request.
        $session            = $request->session();

        // Récupère le ticket stocké dans la session.
        $ticket = $session->get('auth.ticket');

        // Si l'id de la confrontation n'existe pas dans la liste des ids.
        if (!array_key_exists($confrontationId, $ticket['items']))
        {
            // Ajoute l'id de la confrontation à la liste.
            $ticket['ids'][] = $confrontationId;
        }

        // Assign l'id de la team spécifié à l'item qui à l'index de l'id de la confrontation.
        $ticket['items'][$confrontationId] = $result;

        // Écrire le nouveau ou mai à jour le ticket.
        $session->put('auth.ticket', $ticket);

        // Redirige le parieur sur la page précédente.
        return redirect(route($redirect));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(int $id)
    {
        //
    }
}
