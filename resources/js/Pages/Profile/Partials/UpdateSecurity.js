import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Button, Form } from 'react-bootstrap';
import ProfileSection from '@/Pages/Profile/Partials/ProfileSection';

export default function UpdateSecurity() {
    const { post, errors, data, setData, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const resetPasswords = () => {
        reset('current_password', 'password', 'password_confirmation')
    }

    const onHandleChange = event => {
        setData(event.target.name, event.target.value);
    };

    const submit = e => {
        e.preventDefault();
        post(route('profile.update.security'), {
            onFinish: resetPasswords
        });
    };

    return (
        <ProfileSection
            title="Mettre à jour le mot de passe"
            description="Assurez-vous que votre compte utilise un mot de passe long et aléatoire pour rester sécurisé."
        >
            <form
                onSubmit={submit}
                className="needs-validation"
                noValidate
            >

                <Form.FloatingLabel
                    controlId="current_password"
                    label="Mot de passe actuel"
                    className="mb-3"
                >
                    <Form.Control
                        type="password"
                        name="current_password"
                        value={data.current_password}
                        onChange={onHandleChange}
                        placeholder="Mot de passe actuel"
                        isInvalid={'current_password' in errors}
                        autoComplete="new-password"
                        required
                    />
                    <Form.Control.Feedback type="invalid" children={errors.current_password} />
                </Form.FloatingLabel>

                <Form.FloatingLabel
                    controlId="new_password"
                    label="Nouveau mot de passe"
                    className="mb-3"
                >
                    <Form.Control
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={onHandleChange}
                        placeholder="Nouveau mot de passe"
                        isInvalid={'password' in errors}
                        autoComplete="new-password"
                        required
                    />
                    <Form.Control.Feedback type="invalid" children={errors.password} />
                </Form.FloatingLabel>

                <Form.FloatingLabel
                    controlId="password_confirmation"
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
                        autoComplete="new-password"
                        required
                    />
                    <Form.Control.Feedback type="invalid" children={errors.password_confirmation} />
                </Form.FloatingLabel>

                <Button variant="fourth" type="submit">Enregistrer</Button>
            </form>
        </ProfileSection>
    );
}
