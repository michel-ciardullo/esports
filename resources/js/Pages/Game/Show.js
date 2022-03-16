import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import AppLayout from '@/Layouts/AppLayout';
import {Container} from 'react-bootstrap';
import FlashStatus from "@/Components/FlashStatus";
import UpdateInformations from "@/Pages/Profile/Partials/UpdateInformations";
import UpdateSecurity from "@/Pages/Profile/Partials/UpdateSecurity";
import DeleteAccount from "@/Pages/Profile/Partials/DeleteAccount";

function Tournament(props) {
    return (
        <div className="col mb-4">
            <div className="card" style={{height: '100%'}}>
                <div className="card-body" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column'
                }}>
                    <h5 className="card-title">{props.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Format : {props.format}</h6>
                    <p className="card-text">
                        Some quick example text to build on the card title and make up
                        the bulk of the card's content.
                    </p>
                    <div>
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function GameShow(props) {
    const tournaments = props.game.tournaments
        ? props.game.tournaments.map((tournament, i) => <Tournament key={i} {...tournament} />)
        : null;

    return (
        <AppLayout {...props}>
            <Head title={props.game.name} />

            <Container className="mt-4">

                <h1 className="mb-0">Jeux</h1>
                <hr className="my-4"/>

                <div className="card">
                    <div className="card-header bg-primary text-light">
                        <h2>Jeux</h2>
                    </div>
                    body
                </div>

            </Container>

            <Container className="mt-3 mt-md-4 mt-lg-5">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {tournaments}
                </div>
            </Container>
        </AppLayout>
    );
}
