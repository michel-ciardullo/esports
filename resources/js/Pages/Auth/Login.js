import React from 'react';
import Guest from '@/Layouts/Guest';
import {Head, Link, useForm} from '@inertiajs/inertia-react';
import {Form} from 'react-bootstrap';

export default function Login() {
    const { post, errors, data, setData } = useForm({
        email: '',
        password: '',
        remember_me: '',
    });

    const onHandleChange = event => {
        setData(event.target.name, event.target.value);
    };

    const onHandleChangeCheck = event => {
        setData(event.target.name, event.target.value === 'on' ? 'off' : 'on');
    };

    const submit = e => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <Guest className="text-justify" title="Connecte-toi !">
            <Head title="Se connecter" />

            <form
                onSubmit={submit}
                className="needs-validation"
                noValidate
            >

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

                <Form.Check
                    className="mb-1"
                    value={data.remember_me}
                    checked={data.remember_me === 'on' ?? false}
                    onChange={onHandleChangeCheck}
                    label="Se souvenir de moi ?"
                    isInvalid={'remember_me' in errors}
                    feedback={errors.agree}
                    name="remember_me"
                    type="checkbox"
                    required
                />

                <Link className="d-block mb-3 text-light" href={route('password.request')}>
                    Mot de passe oublié ?
                </Link>

                <button className="w-100 btn btn-lg btn-outline-primary" type="submit">
                    Se connecter
                </button>

                <p className="text-center mb-3">
                   Vous n'avez pas encore de compte ? <Link href={route('register')}>S'inscrire</Link>
                </p>
                
            </form>
        </Guest>
    );
}
