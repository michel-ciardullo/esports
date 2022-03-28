import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import { Accordion } from 'react-bootstrap'

import ConfrontationList from './ConfrontationList'

export default function Tournament({ gameSlug, tournament }) {
    return (
        <Accordion.Item eventKey={tournament.id.toString()}>
            <Accordion.Header>
                <Link className="text-light h4 mb-0" href={route('esports.tournament', [gameSlug, tournament.slug])}>
                    <span className="span-overflow">{tournament.name}</span>
                </Link>
            </Accordion.Header>
            <Accordion.Body className="p-2">
                <ConfrontationList confrontations={tournament.confrontations} gameSlug={gameSlug} tournamentSlug={tournament.slug}/>
            </Accordion.Body>
        </Accordion.Item>
    )
}
