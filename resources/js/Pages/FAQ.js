import React from 'react';
import { Head, Link } from '@inertiajs/inertia-react'
import { Container, Accordion, Breadcrumb } from 'react-bootstrap'

import AppLayout from '@/Layouts/AppLayout'

export default function FAQIndex(props) {

    return (
        <AppLayout {...props}>
            <Head title="FAQ" />

            <Container className="mt-4">

                <Breadcrumb>
                    <li className="breadcrumb-item">
                        <Link href={route('home')} role="button">Accueil</Link>
                    </li>
                    <Breadcrumb.Item active>FAQ</Breadcrumb.Item>
                </Breadcrumb>
                <hr className="my-4"/>

                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Accordion Item #1</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Accordion Item #2</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </Container>
        </AppLayout>
    )
}
