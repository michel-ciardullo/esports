import React from 'react';
import Guest from '@/Layouts/Guest';
import { Head, useForm } from '@inertiajs/inertia-react';
import {Alert, Form} from 'react-bootstrap';

export default function ForgotPassword({ status }) {
    const { data, setData, post, errors }   = useForm({ email: '' });

    const onHandleChange = e => {
        setData(e.target.name, e.target.value);
    };

    const submit = e => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <Guest>
            <Head title="Mot de passe oublié" />

            <form
                onSubmit={submit}
                className="needs-validation"
                noValidate
            >
                <div className="text-sm text-dark forgot-text">
                    <p>
                        Vous avez oublié votre mot de passe ? Aucun problème.
                    </p>
                    <p className="mb-5">
                        Il suffit de nous communiquer votre adresse
                        électronique et nous vous enverrons un lien de réinitialisation du mot de passe qui vous permettra
                        d'en choisir un nouveau.
                    </p>
                </div>

                {status && <Alert variant="success" children={status} />}

                <Form.FloatingLabel
                    controlId="email"
                    label="Adresse mail"
                    className="mb-3"
                >
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        value={data.email}
                        onChange={onHandleChange}
                        isInvalid={'email' in errors}
                        required
                    />
                    <Form.Control.Feedback type="invalid" children={errors.email} />
                </Form.FloatingLabel>

                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    Réinitialiser le mot de passe
                </button>
            </form>
        </Guest>
    );
}
