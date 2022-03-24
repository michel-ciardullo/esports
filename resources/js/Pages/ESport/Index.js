import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import { Container } from 'react-bootstrap';
import AppLayout from '@/Layouts/AppLayout';

import GameScroller from "@/Pages/ESport/Partials/GameScroller";
import GameShowMatches from "@/Pages/ESport/Partials/GameShowMatches";

export default function ESportIndex(props) {

    return (
        <AppLayout {...props}>
            <Head title="ESports" />

            <Container className="mt-4">

                <h1 className="mb-0">ESports</h1>
                <hr className="my-4"/>

                <GameScroller games={props.games}/>
                {props.games.map((game, i) => <GameShowMatches key={i} games={game} />)}

            </Container>
        </AppLayout>
    );
}
