import React from 'react';
import {Head, useForm} from '@inertiajs/inertia-react';
import AppLayout from '@/Layouts/AppLayout';
import {Button, Container, Form} from "react-bootstrap";

export default function Home(props) {

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

                <div className="row">
                    <div className="col-lg-4 mb-2 mb-lg-0">
                        <h2 className="h3">
                            Informations sur le profil
                        </h2>
                        <p>
                            Mettez à jour les informations du profil et l'adresse électronique de votre compte.
                        </p>
                    </div>
                    <div className="col-lg-8">
                        <div className="card card-body shadow">

                            <form action="#">

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

                                <Button variant="outline-primary" type="submit">Enregistrer</Button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-lg-4 mb-2 mb-lg-0">
                        <h2 className="h3">
                            Mettre à jour le mot de passe
                        </h2>
                        <p>
                            Assurez-vous que votre compte utilise un mot de passe long et aléatoire pour rester sécurisé.
                        </p>
                    </div>
                    <div className="col-lg-8">
                        <div className="card card-body shadow">
                            a
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-lg-4 mb-2 mb-lg-0">
                        <h2 className="h3">
                            Supprimer le compte
                        </h2>
                        <p>
                            Supprimer définitivement votre compte.
                        </p>
                    </div>
                    <div className="col-lg-8">
                        <div className="card card-body border-danger shadow">
                            <p className="mb-0 text-sm text-gray">
                                Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées.
                                Avant de supprimer votre compte, veuillez télécharger toutes les données ou informations que vous
                                souhaitez conserver.
                            </p>
                            <form className="mt-3" action="#">
                                <Button variant="outline-danger">Supprimer le compte</Button>
                            </form>
                        </div>
                    </div>
                </div>

            </Container>
        </AppLayout>
    );
}
