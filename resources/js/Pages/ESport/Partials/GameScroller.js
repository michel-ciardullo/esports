import React from 'react';
import { Link } from '@inertiajs/inertia-react'
import Sprites from "@/Components/Sprites";

function Logo ({ height, width, game }) {
    let counter = 0;
    if(game.tournaments.now.length != 0) {
        game.tournaments.now.forEach((tournament)=> {
            counter = 0
            tournament.confrontations.forEach(() => {
                counter++
            })
        })
    }

    return (
        <Link className="game-scroller-element me-3" href={route('esports.game', game.slug)}>
            <Sprites className={game.slug} height={height} width={width} sprite={game.slug} />
            <div className="match-number bg-secondary rounded text-white text-center money">{counter}</div>
        </Link>
    )
}

export default function GameScroller({games}) {

    return (
        <div className="game-scroller d-flex py-2 px-2 w-100 mb-3">
            {games.map((game, i) =>
            <Logo
                key={i}
                height="80"
                width="80"
                game={game}
            />
            )}
        </div>
    )
}
