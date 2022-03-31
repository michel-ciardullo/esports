import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react'
import { Container, Breadcrumb } from 'react-bootstrap'

import AppLayout from '@/Layouts/AppLayout'
import Game from './Partials/Game'
import GameScroller from './Partials/GameScroller'

export default function ESportsShow({ auth, esport }) {
    const tournamentName = (esport.tournaments.yesterday.length > 0 ? esport.tournaments.yesterday[0].name : null)
        || (esport.tournaments.now.length > 0 ? esport.tournaments.now[0].name : null)
        || (esport.tournaments.today.length > 0 ? esport.tournaments.today[0].name : null)
        || (esport.tournaments.tomorrow.length > 0 ? esport.tournaments.tomorrow[0].name : null)

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
                    <li className="breadcrumb-item">
                        <Link href={route('esports.game', esport.slug)} role="button">{esport.name}</Link>
                    </li>
                    <Breadcrumb.Item active>{tournamentName}</Breadcrumb.Item>
                </Breadcrumb>
                <hr className="my-4"/>

                {/*<GameScroller games={esport}/>*/}

                <Game auth={auth} game={esport}/>

            </Container>
        </AppLayout>
    );
}
