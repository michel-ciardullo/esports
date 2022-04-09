import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import { Accordion } from 'react-bootstrap'

import ConfrontationList from './ConfrontationList'

export default function TournamentItem({ tournament }) {
    return (
        <Accordion.Item eventKey={tournament.id.toString()}>
            <Accordion.Header>
                <Link className="text-light h4 mb-0" href={tournament.link}>
                    <span className="span-overflow">{tournament.name}</span>
                </Link>
            </Accordion.Header>
            <Accordion.Body className="p-2">
                <ConfrontationList confrontations={tournament.confrontations}/>
            </Accordion.Body>
        </Accordion.Item>
    )
}
