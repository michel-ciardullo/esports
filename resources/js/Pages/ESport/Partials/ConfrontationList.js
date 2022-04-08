import React from 'react'
import ConfrontationItem from './ConfrontationItem'

export default function ConfrontationList({ game, tournament, confrontations }) {
    return confrontations.map((confrontation, i) =>
        <ConfrontationItem key={i} confrontation={confrontation} game={game} tournament={tournament}/>
    )
}
