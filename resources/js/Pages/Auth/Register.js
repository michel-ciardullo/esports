import React from 'react';
import Guest from '@/Layouts/Guest';
import {Head, Link, useForm} from '@inertiajs/inertia-react';
import {Form} from "react-bootstrap";

export default function Login() {
    const { post, errors, data, setData } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        agree: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onHandleChangeCheck = (event) => {
        setData(event.target.name, event.target.value === 'on' ? 'off' : 'on');
    };

    const submit = e => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <Guest title="S'inscrire">
            <Head title="Inscription" />

            <form
                onSubmit={submit}
                className="needs-validation"
                noValidate
            >

                <Form.FloatingLabel
                    controlId="name"
                    label="Nom"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={onHandleChange}
                        placeholder="Nom"
                        isInvalid={'name' in errors}
                        required
                    />
                    <Form.Control.Feedback type="invalid" children={errors.name} />
                </Form.FloatingLabel>

                <Form.FloatingLabel
                    controlId="email"
                    label="Adresse mail"
                    className="mb-3"
                >
                    <Form.Control
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={onHandleChange}
                        placeholder="name@example.com"
                        isInvalid={'email' in errors}
                        required
                    />
                    <Form.Control.Feedback type="invalid" children={errors.email} />
                </Form.FloatingLabel>

                <Form.FloatingLabel
                    controlId="password"
                    label="Mot de passe"
                    className="mb-3"
                >
                    <Form.Control
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={onHandleChange}
                        placeholder="Mot de passe"
                        isInvalid={'password' in errors}
                        required
                    />
                    <Form.Control.Feedback type="invalid" children={errors.password} />
                </Form.FloatingLabel>

                <Form.FloatingLabel
                    controlId="confirm_password"
                    label="Confirmer le mot de passe"
                    className="mb-3"
                >
                    <Form.Control
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={onHandleChange}
                        placeholder="Confirmer le mot de passe"
                        isInvalid={'password_confirmation' in errors}
                        required
                    />
                </Form.FloatingLabel>

                <Form.Check
                    className="mb-3"
                    value={data.agree}
                    checked={data.agree === 'on' ?? false}
                    onChange={onHandleChangeCheck}
                    label="J'accepte les termes et conditions"
                    isInvalid={'agree' in errors}
                    feedback={errors.agree}
                    name="agree"
                    type="checkbox"
                    required
                />

                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    S'inscrire
                </button>

                <p className="text-center mb-2 mt-2">
                   Vous avez déjà compte ? <Link href={route('login')}>Se connecter</Link>
                </p>
            </form>

        </Guest>
    );
}
