<?php

namespace App\Http\Controllers\Wallet;

use App\Http\Controllers\Controller;
use App\Http\Requests\Wallet\WalletDepositRequest;
use App\Http\Requests\Wallet\WalletWithdrawalRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WalletController extends Controller
{
    /**
     * @param Request $request
     * @return Response
     */
    public function index(Request $request) : Response
    {
        $user   = $request->user();
        $wallet = $user->wallet;

        $transactions = $wallet->transactions()
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Wallet/Index', compact('transactions'));
    }

    /**
     * @param WalletDepositRequest $request
     * @return RedirectResponse
     */
    public function deposit(WalletDepositRequest $request) : RedirectResponse
    {
        $user   = $request->user();
        $wallet = $user->wallet;

        $amount = $request->input('amount');
        $wallet->update([
            'balance' => $user->wallet->balance += $amount
        ]);

        $wallet->transactions()->forceCreate([
            'wallet_id' => $user->wallet->id,
            'type'      => 'deposit',
            'amount'    => $amount,
        ]);

        return back(303)
            ->with('flash', [
                'status' => 'success',
                'message' => "Le dépôt à bien été effetué."
            ]);
    }

    /**
     * @param WalletWithdrawalRequest $request
     * @return RedirectResponse
     */
    public function withdrawal(WalletWithdrawalRequest $request) : RedirectResponse
    {
        $user               = $request->user();
        $wallet             = $user->wallet;

        $currentBalance     = $wallet->balance;
        $requestWithdrawal  = $request->input('amount');

        if ($currentBalance > 0)
        {
            // Si le montant demander est supérieure à la balance du portefeuille
            if ($currentBalance < $requestWithdrawal)
            {
                // On récupère que le reste
                $requestWithdrawal  = $currentBalance % $requestWithdrawal;
            }

            $newBalance = $currentBalance - $requestWithdrawal;

            $wallet->update(['balance' => $newBalance]);

            $wallet->transactions()->forceCreate([
                'wallet_id' => $wallet->id,
                'type'      => 'withdraw',
                'amount'    => $requestWithdrawal,
            ]);

            return back(303)
                ->with('flash', [
                    'status' => 'success',
                    'message' => "Le retrait à bien été effetué, vous avais retiré ${requestWithdrawal}€"
                ]);
        }

        return back(303)
            ->with('flash', [
                'status' => 'warning',
                'message' => "Aucune somme est disponible dans votre portefeuille :(."
            ]);
    }
}
