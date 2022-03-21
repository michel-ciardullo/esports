import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import {Badge, Container} from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';

function GameIcon({ name, confrontationCount }) {
    return (
        <a className={`position-relative p-3 icon-game-${name}`} href="#">
            <Badge style={{ top: '.3rem', right: '.3rem' }} className="position-absolute" variant="success">
                {confrontationCount}
            </Badge>
            <svg width="100" height="100">
                <use xlinkHref={`/img/sprite.svg#${name}`}/>
            </svg>
        </a>
    )
}

export default function ESportIndex(props) {

    return (
        <AppLayout {...props}>
            <Head title="ESports" />

            <Container className="mt-4">

                <h1 className="mb-0">ESports</h1>
                <hr className="my-4"/>

                <div className="card nav-scroller">
                    <div className="d-flex">
                        <GameIcon name="lol" confrontationCount={0} />
                        <GameIcon name="valorant" confrontationCount={0} />
                        <GameIcon name="csgo" confrontationCount={0} />
                        <GameIcon name="cd" confrontationCount={0} />
                    </div>
                </div>

                <div className="card mt-3">
                    <header style={{height: '200px'}} className="d-flex">
                        <div className="m-3">
                            <span>Pinnacle Cup</span>
                        </div>
                        <img
                            style={{
                                backgroundSize: 'cover',
                                objectFit: 'cover'
                            }}
                            className="flex-grow-1"
                            src="https://res.cloudinary.com/betengine/image/fetch/w_750,h_98,o_90,b_rgb:000000,c_fill,g_auto:face,f_webp/https://www.cloudbet.com/sports-data/entity-media/competitor/260198/image/2021-03-08-05-52-46"
                            alt="csgo"
                        />
                    </header>
                    <table className="table table-borderless mb-0">
                        <thead>
                        <tr className="border-bottom border-primary">
                            <th colSpan={3} scope="col">Teams</th>
                            <th scope="col" className="text-center">1</th>
                            <th scope="col" className="text-center">2</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="border-bottom border-primary">
                            <th scope="row" colSpan={3}>
                                <div>Team 1</div>
                                <div>Team 2</div>
                            </th>
                            <td className="text-center">
                                <button className="btn btn-dark mt-1">1</button>
                            </td>
                            <td className="text-center">
                                <button className="btn btn-dark mt-1">2</button>
                            </td>
                        </tr>
                        <tr className="border-bottom border-primary">
                            <th scope="row" colSpan={3}>
                                <div>Team 1</div>
                                <div>Team 2</div>
                            </th>
                            <td className="text-center">
                                <button className="btn btn-dark mt-1">1</button>
                            </td>
                            <td className="text-center">
                                <button className="btn btn-dark mt-1">2</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Container>
        </AppLayout>
    );
}
