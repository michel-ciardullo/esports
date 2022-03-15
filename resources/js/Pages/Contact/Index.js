import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import { Container } from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';

export default function ContactIndex(props) {

    return (
        <AppLayout {...props}>
            <Head title="Contact" />

            <Container className="mt-4">

                <h1 className="mb-0">Contact</h1>
                <hr className="my-4"/>

            </Container>
        </AppLayout>
    );
}
