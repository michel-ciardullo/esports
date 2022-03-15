import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import {Container, Form, Row, Col, Button, FloatingLabel} from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';

export default function ContactIndex(props) {

    return (
        <AppLayout {...props}>
            <Head title="Contact" />

            <Container className="mt-4">

                <h1 className="mb-0">Contactez-nous</h1>
                <hr className="my-4"/>

                <Form className="card card-body shadow">
                    <Row className="mb-3 g-3">
                        <Col>
                            <FloatingLabel
                                controlId="name"
                                label="Nom"
                            >
                                <Form.Control type="text" placeholder="Nom" />
                            </FloatingLabel>
                        </Col>

                        <Col>
                            <FloatingLabel
                                controlId="email"
                                label="Adresse mail"
                            >
                                <Form.Control type="email" placeholder="Adresse mail" />
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <FloatingLabel
                        className="mb-3"
                        controlId="subject"
                        label="Sujet"
                    >
                        <Form.Control type="text" placeholder="Sujet" />
                    </FloatingLabel>

                    <FloatingLabel
                        className="mb-3"
                        controlId="message"
                        label="Message"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Message"
                            as="textarea"
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>

                    <div>
                        <Button variant="outline-primary" type="submit">
                            Envoyer
                        </Button>
                    </div>

                </Form>

            </Container>
        </AppLayout>
    );
}
