import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import { Container } from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';

function ConfrontationList({ lives, confrontations })
{
    return lives['confrontations'].map(function (confrontation_id) {
        return (
            <span>
                {confrontations[confrontation_id].status}
            </span>
        );
    });
}

function TournamentList({ lives, tournaments, confrontations })
{
    return lives['tournaments'].map(function (tournament_id)
    {
        return (
            <p>
                {tournaments[tournament_id].name} :
                <ConfrontationList
                    lives={lives}
                    confrontations={confrontations}
                />
            </p>
        );
    });
}

function LiveList({ lives, games, tournaments, confrontations })
{
    return lives['games'].map(function (game_id)
    {
        const tournaments_lives = lives['tournaments'].map(function (tournament_id)
        {
            return <TournamentList
                lives={lives}
                tournaments={tournaments}
                confrontations={confrontations}
            />;
        });

        return (
            <div className="card mb-3">
                <div className="card-header bg-primary">{games[game_id].name}</div>
                <div className="card-body">{tournaments_lives}</div>
            </div>
        );
    });
}

export default function GameShow({ auth, lives, games, tournaments, confrontations }) {
    return (
        <AppLayout auth={auth}>
            <Head title="Game show" />

            <Container className="mt-4">

                <h1 className="mb-0">Game show</h1>
                <hr className="my-4"/>

                <LiveList
                    lives={lives}
                    games={games}
                    tournaments={tournaments}
                    confrontations={confrontations}
                />

            </Container>
        </AppLayout>
    );
}
