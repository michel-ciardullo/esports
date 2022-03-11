import React from 'react';
import Guest from '@/Layouts/Guest';
import { Head } from '@inertiajs/inertia-react';

export default function Login(){
    return (
        <Guest>
            <Head title="Se connecter" />

            <form className="card card-body needs-validation" action="/login" method="POST" noValidate>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Adresse mail</label>
                    <input type="email" id="email" name="email" className="form-control " />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input type="password" name="password" id="password" className="form-control " />
                </div>

                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" name="remember_me" value="on" /> Rester connecté ?
                    </label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    Se connecter
                </button>
            </form>
        </Guest>
    );
}
