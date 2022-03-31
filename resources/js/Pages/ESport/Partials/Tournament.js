import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import { Accordion } from 'react-bootstrap'

import ConfrontationList from './ConfrontationList'
import Sprites from '@/Components/Sprites';

export default function Tournament({ auth, gameSlug, tournament }) {
    return (
        <Accordion.Item className="accordion-item-e-sport mb-3 shadow" eventKey={tournament.id.toString()}>
            <Accordion.Header>
                <Sprites height="20px" width="20px" sprite={gameSlug} fill='gray' className="me-2" />
                <Link className="text-light mb-0" href={route('esports.tournament', [gameSlug, tournament.slug])}>
                    {tournament.name}
                </Link>
            </Accordion.Header>
            <Accordion.Body>
                <div className="tourney-content">
                    <div className="row mb-1 tourney-content-head">
                        <div className="d-flex col-2 col-md-1"></div>
                        <div className="d-flex flex-row align-items-center col-4 col-md-5">
                        </div>
                        <div className="d-flex flex-row justify-content-between col-5">
                            <span className="w-50 d-block text-center">1</span>
                            <span className="w-50 d-block text-center">2</span>
                        </div>
                        <div className="col-1"></div>
                    </div>
                    <ConfrontationList
                        auth={auth}
                        gameSlug={gameSlug}
                        tournamentSlug={tournament.slug}
                        confrontations={tournament.confrontations}
                    />
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}
