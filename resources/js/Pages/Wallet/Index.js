import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import {Container, Tab, Row, Col, FloatingLabel, Badge, ListGroup, Form, Button} from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';

export default function ProfileIndex(props) {

    return (
        <AppLayout {...props}>
            <Head title="Portefeuille" />

            <Container className="mt-4">

                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="mb-0">Portefeuille</h1>
                    <div>
                        <Badge className="p-3" variant="primary">0€</Badge>
                    </div>
                </div>
                <hr className="my-4"/>

                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        <Col sm={4}>
                            <ListGroup>
                                <ListGroup.Item action href="#link1">
                                    Opérations
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link2">
                                    Déposer
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link3">
                                    Retirer
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#link1">
                                    <ListGroup as="ul">
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">Opération 1</div>
                                                <em>date de l'opération</em>
                                            </div>
                                            <Badge bg="success" pill>
                                                +14€
                                            </Badge>
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">Opération 2</div>
                                                <em>date de l'opération</em>
                                            </div>
                                            <Badge bg="success" pill>
                                                +14€
                                            </Badge>
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">Opération 3</div>
                                                <em>date de l'opération</em>
                                            </div>
                                            <Badge bg="danger" pill>
                                                -14€
                                            </Badge>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link2">
                                    <form>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email address"
                                            className="mb-3"
                                        >
                                            <Form.Control type="email" placeholder="name@example.com" />
                                        </FloatingLabel>

                                        <Button variant="outline-primary">Déposer</Button>
                                    </form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link3">
                                    c
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>

            </Container>
        </AppLayout>
    );
}
