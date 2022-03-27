import React from 'react'
import Confrontation from './Confrontation'

export default function ConfrontationList({ gameSlug, tournamentSlug, confrontations }) {
    return confrontations.map((confrontation, i) =>
        <Confrontation key={i} confrontation={confrontation} gameSlug={gameSlug} tournamentSlug={tournamentSlug}/>
    )
}
