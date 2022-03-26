import React from 'react';
import Sprites from "@/Components/Sprites";

function Logo ({ height, width, gameId, lives, games }) {
    let tab= [];
    lives['games'].forEach((gameIdx)=> {
        tab[gameIdx] = 0
        lives['tournaments'][gameIdx].forEach((tournamentIdx) => {
            lives.confrontations[tournamentIdx].forEach(() =>
                tab[gameIdx]++
            )
        })
    })

    return (
        <a className="game-scroller-element me-3" href={`#${games[gameId].slug}`}>
            <Sprites className={games[gameId].slug} height={height} width={width} sprite={games[gameId].slug} />
            <div className="match-number bg-secondary rounded text-white text-center money">{tab[gameId]}</div>
        </a>
    )
}

export default function GameScroller({ lives, games }) {

    return (
        <div className="game-scroller d-flex py-2 px-2 w-100 mb-3">
            {lives['games'].map((id, i) =>
            <Logo
                key={i}
                height="80"
                width="80"
                gameId={id}
                lives={lives}
                games={games}
            />
            )}
        </div>
    )
}
