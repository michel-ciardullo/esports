import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react'
import { Container, Breadcrumb } from 'react-bootstrap'

import AppLayout from '@/Layouts/AppLayout'
import GameItem from './Partials/GameItem'

export default function ESportsShow({ auth, esport }) {
    return (
        <AppLayout auth={auth}>
            <Head title="ESports" />
            <Container className="mt-4">
                <Breadcrumb>
                    <li className="breadcrumb-item">
                        <Link href={route('home')} role="button">Accueil</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link href={route('esports.index')} role="button">ESports</Link>
                    </li>
                    <Breadcrumb.Item active>{esport.name}</Breadcrumb.Item>
                </Breadcrumb>
                <hr className="my-4"/>
                <GameItem game={esport}/>
            </Container>
        </AppLayout>
    )
}
