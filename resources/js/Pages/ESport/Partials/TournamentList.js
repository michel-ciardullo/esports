import React from 'react'
import { Accordion } from 'react-bootstrap'

import TournamentItem from './TournamentItem'

export default function TournamentList({ game, tournaments, message }) {
    if (tournaments.length === 0) {
        return (
            <p className="mb-0">{message}</p>
        )
    }
    return (
        <Accordion defaultActiveKey={tournaments.map(tournament => tournament.id.toString())}>
            {tournaments.map((tournament, i) =>
                <TournamentItem key={i} game={game} tournament={tournament} />
            )}
        </Accordion>
    )
}
