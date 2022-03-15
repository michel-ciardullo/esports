import React from 'react';
import { Head, useForm } from '@inertiajs/inertia-react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Container, Form } from 'react-bootstrap';
import ProfileSection from '@/Pages/Profile/Partials/ProfileSection';
import UpdateInformations from '@/Pages/Profile/Partials/UpdateInformations';
import FlashStatus from "@/Components/FlashStatus";

export default function ProfileIndex(props) {

    const { errors, data, setData } = useForm({
        name: props.auth.user.name,
        email: props.auth.user.email,
    });

    const onHandleChange = event => {
        setData(event.target.name, event.target.value);
    };

    return (
        <AppLayout {...props}>
            <Head title="Profile" />

            <Container className="mt-4">

                <h1 className="mb-0">Profile page</h1>
                <hr className="my-4"/>

                <FlashStatus status={props.flash.status} message={props.flash.message}/>

                <UpdateInformations user={props.auth.user}/>

                <hr/>

                <ProfileSection
                    title="Mettre à jour le mot de passe"
                    description="Assurez-vous que votre compte utilise un mot de passe long et aléatoire pour rester sécurisé."
                >
                    <form action="#">

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
                                name="new_password"
                                value={data.new_password}
                                onChange={onHandleChange}
                                placeholder="Nouveau mot de passe"
                                isInvalid={'new_password' in errors}
                                required
                            />
                            <Form.Control.Feedback type="invalid" children={errors.new_password} />
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
                                required
                            />
                            <Form.Control.Feedback type="invalid" children={errors.password_confirmation} />
                        </Form.FloatingLabel>

                        <Button variant="outline-primary" type="submit">Enregistrer</Button>
                    </form>
                </ProfileSection>

                <hr/>

                <ProfileSection
                    title="Supprimer le compte"
                    description="Supprimer définitivement votre compte."
                >
                    <p className="mb-0 text-sm text-gray">
                        Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées.
                        Avant de supprimer votre compte, veuillez télécharger toutes les données ou informations que vous
                        souhaitez conserver.
                    </p>
                    <form className="mt-3" action="#">
                        <Button variant="outline-danger">Supprimer le compte</Button>
                    </form>
                </ProfileSection>

            </Container>
        </AppLayout>
    );
}
