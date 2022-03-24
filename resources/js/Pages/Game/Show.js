import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import { Container } from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';

function TodayConfrontationList({ tournament_id, data, confrontations })
{
    return data['confrontations'][tournament_id].map(function (confrontation_id)
    {
        return (
            <li>
                <span>{confrontations[confrontation_id].teams[0].name}</span> -
                <span>{confrontations[confrontation_id].teams[1].name}</span>
            </li>
        );
    });
}

function TodayTournamentList({ game_id, data, tournaments, confrontations })
{
    return data['tournaments'][game_id].map(function (tournament_id)
    {
        return (
            <>
                <p key={tournament_id}>
                    {tournaments[tournament_id].name}
                </p>
                <ul>
                    <TodayConfrontationList
                        data={data}
                        tournament_id={tournament_id}
                        confrontations={confrontations}
                    />
                </ul>
            </>
        );
    });
}

function TodayList({ data, games, tournaments, confrontations })
{
    return data['games'].map(function (game_id)
    {
        return (
            <div className="card mb-3" key={game_id}>
                <div className="card-header bg-primary">{games[game_id].name}</div>
                <div className="card-body">
                    <TodayTournamentList
                        data={data}
                        game_id={game_id}
                        tournaments={tournaments}
                        confrontations={confrontations}
                    />
                </div>
            </div>
        );
    });
}

export default function GameShow({ auth, today, games, tournaments, confrontations }) {
    return (
        <AppLayout auth={auth}>
            <Head title="Game show" />

            <Container className="mt-4">

                <h1 className="mb-0">Game show</h1>
                <hr className="my-4"/>

                <TodayList
                    data={today}
                    games={games}
                    tournaments={tournaments}
                    confrontations={confrontations}
                />

            </Container>
        </AppLayout>
    );
}

