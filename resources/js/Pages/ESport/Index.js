import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react'
import { Breadcrumb, Container } from 'react-bootstrap'

import AppLayout from '@/Layouts/AppLayout'
import GameList from '@/Pages/ESport/Partials/GameList'
import GameScroller from './Partials/GameScroller'

export default function ESportsIndex({ auth, esports }) {

    return (
        <AppLayout auth={auth}>
            <Head title="ESports" />

            <Container className="mt-4">

                <Breadcrumb>
                    <li className="breadcrumb-item">
                        <Link href={route('home')} role="button">Accueil</Link>
                    </li>
                    <Breadcrumb.Item active>ESports</Breadcrumb.Item>
                </Breadcrumb>
                <hr className="my-4"/>

                <GameScroller games={esports}/>

                <GameList auth={auth} games={esports}/>

            </Container>
        </AppLayout>
    );
}
