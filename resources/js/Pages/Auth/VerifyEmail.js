import React from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import {Alert, Button} from 'react-bootstrap';

import Guest from '@/Layouts/Guest';

export default function VerifyEmail({ status }) {
    const { post } = useForm();

    const submit = e => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <Guest title="Vérification du mail">
            <Head title="Vérification du mail" />

            <p className="text-sm">
                Merci de vous être inscrit ! Avant de commencer, pourriez-vous vérifier votre adresse e-mail en cliquant sur le
                lien que nous venons de vous envoyer par e-mail ? Si vous n'avez pas reçu l'e-mail, nous serons heureux de vous en envoyer un autre.
            </p>

            {status && <Alert variant="success" children={status} />}

            <form
                onSubmit={submit}
                className="needs-validation"
                noValidate
            >
                <div>
                    <Button variant="outline-primary" type="submit">
                        Renvoyer le courriel de vérification
                    </Button>
                </div>

                <div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="btn btn-link ps-0"
                    >
                        Déconnexion
                    </Link>
                </div>
            </form>
        </Guest>
    );
}
