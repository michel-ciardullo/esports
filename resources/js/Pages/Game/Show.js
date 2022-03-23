import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import { Container } from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';

export default function GameShow({ auth }) {

    return (
        <AppLayout auth={auth}>
            <Head title="Game show" />

            <Container className="mt-4">

                <h1 className="mb-0">Game show</h1>
                <hr className="my-4"/>

            </Container>
        </AppLayout>
    );
}
