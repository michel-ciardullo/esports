import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import AppLayout from '@/Layouts/AppLayout';
import {Container} from "react-bootstrap";

export default function GameShow(props) {
    return (
        <AppLayout {...props}>
            <Head title={props.game.name} />

            <Container className="mt-3 mt-md-4 mt-lg-5">

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {props.tournaments.map(({name, format}, i) =>
                        <div key={i} className="col mb-4">
                            <div className="card" style={{height: '100%'}}>
                                <div className="card-body" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'column'
                                }}>
                                    <h5 className="card-title">{name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Format : {format}</h6>
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
                    )}
                </div>
            </Container>
        </AppLayout>
    );
}
