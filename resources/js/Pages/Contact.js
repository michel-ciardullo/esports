import React from 'react'
import { Head, Link, useForm } from '@inertiajs/inertia-react'
import { Container, Form, Row, Col, Button, Breadcrumb } from 'react-bootstrap'

import AppLayout from '@/Layouts/AppLayout'
import FlashStatus from '@/Components/FlashStatus'

export default function ContactIndex(props) {
    const { post, errors, data, setData, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const onHandleChange = event => {
        setData(event.target.name, event.target.value)
    }

    const submit = e => {
        e.preventDefault()
        post(route('contact.send'), {
            onFinish: reset
        })
    }

    return (
        <AppLayout {...props}>
            <Head title="Contact" />

            <Container className="mt-4">

                <Breadcrumb>
                    <li className="breadcrumb-item">
                        <Link href={route('home')} role="button">Accueil</Link>
                    </li>
                    <Breadcrumb.Item active>Contactez-nous</Breadcrumb.Item>
                </Breadcrumb>
                <hr className="my-4"/>

                <FlashStatus {...props.flash}/>

                <Form
                    className="card card-body shadow needs-validation"
                    onSubmit={submit}
                    noValidate
                >
                    <Row className="mb-3 g-3">
                        <Col>
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
                                    placeholder="Nom"
                                    isInvalid={'name' in errors}
                                    required
                                />
                                <Form.Control.Feedback type="invalid" children={errors.name} />
                            </Form.FloatingLabel>
                        </Col>

                        <Col>
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
                        </Col>
                    </Row>

                    <Form.FloatingLabel
                        controlId="subject"
                        label="Subject"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            name="subject"
                            value={data.subject}
                            onChange={onHandleChange}
                            placeholder="Subject"
                            isInvalid={'subject' in errors}
                            required
                        />
                        <Form.Control.Feedback type="invalid" children={errors.subject} />
                    </Form.FloatingLabel>

                    <Form.FloatingLabel
                        controlId="message"
                        label="Message"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            name="message"
                            value={data.message}
                            onChange={onHandleChange}
                            placeholder="Message"
                            isInvalid={'message' in errors}
                            as="textarea"
                            style={{ height: '100px' }}
                            required
                        />
                        <Form.Control.Feedback type="invalid" children={errors.message} />
                    </Form.FloatingLabel>

                    <div>
                        <Button variant="outline-primary" type="submit">
                            Envoyer
                        </Button>
                    </div>

                </Form>

            </Container>
        </AppLayout>
    )
}
