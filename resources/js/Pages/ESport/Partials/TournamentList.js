import React from 'react'
import { Accordion } from 'react-bootstrap'

import Tournament from './Tournament'

export default function TournamentList({ auth, gameSlug, tournaments, message }) {
    if (tournaments.length === 0) {
        return (
            <p className="pb-5 text-center">{message}</p>
        )
    }
    return (
        <Accordion defaultActiveKey={tournaments.map(tournament => tournament.id.toString())} alwaysOpen>
            {tournaments.map((tournament, i) =>
                <Tournament key={i} auth={auth} gameSlug={gameSlug} tournament={tournament} />
            )}
        </Accordion>
    )
}
