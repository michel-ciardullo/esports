import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react'
import { Container, Breadcrumb } from 'react-bootstrap'

import AppLayout from '@/Layouts/AppLayout'
import Game from './Partials/Game'
import GameScroller from './Partials/GameScroller'

export default function ESportsShow({ auth, esport }) {

    return (
        <AppLayout auth={auth}>
            <Head title="ESports" />

            <Container className="margin-children">

                <Breadcrumb>
                    <li className="breadcrumb-item">
                        <Link href={route('home')} role="button">Accueil</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link href={route('esports.index')} role="button">ESports</Link>
                    </li>
                    <Breadcrumb.Item active>{esport.name}</Breadcrumb.Item>
                </Breadcrumb>
                <hr className="my-4"/>

                {/*<GameScroller games={esport} />*/}

                <Game auth={auth} game={esport}/>

            </Container>
        </AppLayout>
    );
}
