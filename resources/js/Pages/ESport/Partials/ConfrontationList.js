import React from 'react'
import Confrontation from './Confrontation'

export default function ConfrontationList({ game, tournament, confrontations }) {
    return confrontations.map((confrontation, i) =>
        <Confrontation key={i} confrontation={confrontation} game={game} tournament={tournament}/>
    )
}
