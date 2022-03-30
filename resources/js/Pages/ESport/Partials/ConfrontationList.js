import React from 'react'
import Confrontation from './Confrontation'

export default function ConfrontationList({ auth, gameSlug, tournamentSlug, confrontations }) {
    return confrontations.map((confrontation, i) =>
        <Confrontation key={i} auth={auth} confrontation={confrontation} gameSlug={gameSlug} tournamentSlug={tournamentSlug}/>
    )
}
