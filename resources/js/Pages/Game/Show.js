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

                <h1 className="mb-0">Liste des tournois du jeu</h1>
                <hr className="my-4"/>

                <article className="card mb-3">
                    <header className="d-flex">
                        <div className="d-flex justify-content-start align-items-top p-3" style={{ flex: '.3' }}>
                            <span className="rounded-circle bg-success" style={{
                                width: '34px',
                                height: '34px'
                            }} />
                            <div className="ms-3 d-flex flex-column">
                                <span>Live now</span>
                                <em>Time</em>
                            </div>
                        </div>
                        <div style={{
                            flex: '3',
                            clipPath: 'polygon(3% 0, 100% 0, 100% 100%, 0% 100%)'
                        }}>
                            <div
                                className="bg-dark w-100 p-3"
                                style={{
                                    backgroundImage: 'url(https://images.ctfassets.net/j95d1p8hsuun/29qUXMV0WBycRYM3YQCzzl/a214b2faf007454eae0b7719bea6bf37/1920x720-NWcom2-keyart.jpg)',
                                    height: '150px'
                                }}
                            />
                        </div>
                    </header>
                    <section className="p-3">
                        <table className="table text-light">
                            <thead>
                            <tr>
                                <th scope="col">See all game</th>
                                <th scope="col">1</th>
                                <th scope="col">X</th>
                                <th scope="col">2</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">Live now</th>
                                <td>
                                    <span className="bg-dark p-1">14.0</span>
                                </td>
                                <td>
                                    <span className="bg-dark p-1">12.5</span>
                                </td>
                                <td>
                                    <span className="bg-dark p-1">100.0</span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Live now</th>
                                <td>
                                    <span className="bg-dark p-1">14.0</span>
                                </td>
                                <td>
                                    <span className="bg-dark p-1">12.5</span>
                                </td>
                                <td>
                                    <span className="bg-dark p-1">100.0</span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Live now</th>
                                <td>
                                    <span className="bg-dark p-1">14.0</span>
                                </td>
                                <td>
                                    <span className="bg-dark p-1">12.5</span>
                                </td>
                                <td>
                                    <span className="bg-dark p-1">100.0</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </article>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {tournaments}
                </div>

            </Container>
        </AppLayout>
    );
}
