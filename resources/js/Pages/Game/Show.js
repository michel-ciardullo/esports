import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import { Container } from 'react-bootstrap';
import AppLayout from '@/Layouts/AppLayout';
import FlashStatus from "@/Components/FlashStatus";
import GameTournamentList from '@/Pages/Game/Partials/GameTournamentList';


export default function GameShow(props) {

    return (
        <AppLayout {...props}>
            <Head title={props.game.name} />

            <Container className="mt-4">

                <h1 className="mb-0">Liste des tournois sur {props.game.name}</h1>
                <hr className="my-4"/>

                <GameTournamentList tournaments={props.game.tournaments} />

            </Container>
        </AppLayout>
    );
}