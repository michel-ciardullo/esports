import React, { useEffect } from 'react';
import Guest from '@/Layouts/Guest';
import { Head, useForm } from '@inertiajs/inertia-react';
import {Form, Button} from 'react-bootstrap';

export default function ConfirmPassword() {
    const { data, setData, post, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <Guest>
            <Head title="Confirmer le mot de passe" />

            <form
                onSubmit={submit}
                className="needs-validation"
                noValidate
            >
                <p className="text-sm text-muted">
                    This is a secure area of the application. Please confirm your password before continuing.
                </p>

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
                        isInvalid={'password' in errors}
                        required
                    />
                    <Form.Control.Feedback type="invalid" children={errors.password} />
                </Form.FloatingLabel>

                <Button variant="primary" className="w-100 btn" type="submit">
                    Confirmer
                </Button>
            </form>
        </Guest>
    );
}
