import React from 'react'
import { Accordion } from 'react-bootstrap'

import Tournament from './Tournament'

export default function TournamentList({ game, tournaments, message }) {
    if (tournaments.length === 0) {
        return (
            <p className="mb-0">{message}</p>
        )
    }
    return (
        <Accordion defaultActiveKey={tournaments.map(tournament => tournament.id.toString())}>
            {tournaments.map((tournament, i) =>
                <Tournament key={i} game={game} tournament={tournament} />
            )}
        </Accordion>
    )
}
