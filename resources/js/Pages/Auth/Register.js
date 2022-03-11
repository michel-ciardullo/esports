import React from 'react';
import Guest from '@/Layouts/Guest';
import {Head, useForm} from '@inertiajs/inertia-react';
import {Form} from "react-bootstrap";

export default function Login() {
    const { post, errors, data, setData } = useForm({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
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
        <Guest>
            <Head title="Se connecter" />

            <form
                onSubmit={submit}
                className="card card-body needs-validation"
                noValidate
            >

                <h1>Connecte-toi !</h1>

                <Form.FloatingLabel
                    controlId="name"
                    label="Nom"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        id="name"
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
                        name="confirm_password"
                        value={data.confirm_password}
                        onChange={onHandleChange}
                        placeholder="Confirmer le mot de passe"
                        isInvalid={'confirm_password' in errors}
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
                    id="agree"
                    name="agree"
                    type="checkbox"
                    required
                />

                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    S'inscrire
                </button>
            </form>

            <div className="text-center">
                <p className="mt-3 mb-1 text-muted">© 2021–2022</p>
            </div>
        </Guest>
    );
}
