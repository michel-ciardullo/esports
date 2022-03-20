import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import {Badge, Container} from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';

export default function ESportIndex(props) {

    return (
        <AppLayout {...props}>
            <Head title="ESports" />

            <Container className="mt-4">

                <h1 className="mb-0">ESports</h1>
                <hr className="my-4"/>

                <div className="card card-body nav-scroller">
                    <div className="d-flex">
                        <div className="position-relative">
                            <Badge className="position-absolute top-0 end-0" variant="success">3</Badge>
                            <svg width="100" height="100" fill="#42e0e4">
                                <use xlinkHref="/img/sprite.svg#lol"/>
                            </svg>
                        </div>
                        <div className="position-relative ms-3">
                            <Badge className="position-absolute top-0 end-0" variant="success">3</Badge>
                            <svg width="100" height="100" fill="#fe4a6d">
                                <use xlinkHref="/img/sprite.svg#valorant"/>
                            </svg>
                        </div>
                        <div className="position-relative ms-3">
                            <Badge className="position-absolute top-0 end-0" variant="success">1</Badge>
                            <svg width="100" height="100" fill="#a0b757">
                                <use xlinkHref="/img/sprite.svg#csgo"/>
                            </svg>
                        </div>
                        <div className="position-relative ms-3">
                            <Badge className="position-absolute top-0 end-0" variant="success">1</Badge>
                            <svg width="100" height="100" fill="#1aa3a1">
                                <use xlinkHref="/img/sprite.svg#cd"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="card mt-3">
                    <header style={{height: '200px'}}>
                        <img
                            width="100%"
                            height="100%"
                            src="https://res.cloudinary.com/betengine/image/fetch/w_750,h_98,o_90,b_rgb:000000,c_fill,g_auto:face,f_webp/https://www.cloudbet.com/sports-data/entity-media/competitor/260198/image/2021-03-08-05-52-46"
                            alt="csgo"/>
                    </header>
                </div>
            </Container>
        </AppLayout>
    );
}
