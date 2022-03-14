import React from 'react';
import Guest from '@/Layouts/Guest';
import {Head, useForm} from '@inertiajs/inertia-react';
import {Form} from "react-bootstrap";

export default function Login() {
    const { post, errors, data, setData } = useForm({
        email: '',
        password: '',
        remember_me: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onHandleChangeCheck = (event) => {
        setData(event.target.name, event.target.value === 'on' ? 'off' : 'on');
    };

    const submit = e => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <Guest>
            <Head title="Se connecter" />

            <form
                onSubmit={submit}
                className="card card-body needs-validation"
                noValidate
            >
                <h1>Connecte-toi !</h1>

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
                    className="mb-3"
                    value={data.remember_me}
                    checked={data.remember_me === 'on' ?? false}
                    onChange={onHandleChangeCheck}
                    label="Rester connecter"
                    isInvalid={'remember_me' in errors}
                    feedback={errors.remember_me}
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    required
                />

                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    Se connecter
                </button>
            </form>

            <div className="text-center">
                <p className="mt-3 mb-1 text-white">© 2021–2022</p>
            </div>
        </Guest>
    );
}
