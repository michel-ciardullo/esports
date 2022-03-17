import React, { useEffect } from 'react';
import Guest from '@/Layouts/Guest';
import {Head, useForm} from '@inertiajs/inertia-react';
import {Form} from 'react-bootstrap';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = event => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.update'));
    };

    return (
        <Guest title="Réinitialiser le mot de passe">
            <Head title="Réinitialiser le mot de passe" />

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
                        autoComplete="username"
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
                        autoComplete="new-password"
                        isInvalid={'password' in errors}
                        required
                    />
                    <Form.Control.Feedback type="invalid" children={errors.password} />
                </Form.FloatingLabel>

                <Form.FloatingLabel
                    controlId="password_confirmation"
                    label="Confirm Password"
                    className="mb-3"
                >
                    <Form.Control
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={onHandleChange}
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        isInvalid={'password_confirmation' in errors}
                        required
                    />
                    <Form.Control.Feedback type="invalid" children={errors.password_confirmation} />
                </Form.FloatingLabel>

                <button className="w-100 btn btn-lg btn-outline-primary" type="submit">
                    Réinitialiser le mot de passe
                </button>
            </form>
        </Guest>
    );
}
