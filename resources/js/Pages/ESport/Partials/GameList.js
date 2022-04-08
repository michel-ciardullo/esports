import React from 'react'
import GameItem from './GameItem'

export default function GameList({ games }) {
    return games.map((game, i) =>
        <GameItem key={i} game={game}/>
    )
}
