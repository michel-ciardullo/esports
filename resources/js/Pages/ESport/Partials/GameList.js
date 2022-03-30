import React from 'react'
import Game from './Game'

export default function GameList({ auth, games }) {
    return games.map((game, i) =>
        <Game key={i} auth={auth} game={game}/>
    )
}
