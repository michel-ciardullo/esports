import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Button, Form } from 'react-bootstrap';
import ProfileSection from '@/Pages/Profile/Partials/ProfileSection';

export default function UpdateInformations({ user }) {
    const { post, errors, data, setData } = useForm({
        name: user.name,
        email: user.email,
    });

    const onHandleChange = event => {
        setData(event.target.name, event.target.value);
    };

    const submit = e => {
        e.preventDefault();
        post(route('profile.update.informations'));
    };

    return (
        <ProfileSection
            title="Informations sur le profil"
            description="Mettez à jour les informations du profil et l'adresse électronique de votre compte."
        >
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
                        placeholder="Name"
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

                <Button variant="primary" type="submit">Enregistrer</Button>
            </form>
        </ProfileSection>
    );
}
