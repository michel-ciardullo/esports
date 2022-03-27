import React from 'react'
import Game from './Game'

export default function GameList({ games }) {
    return games.map((game, i) =>
        <Game key={i} game={game}/>
    )
}
