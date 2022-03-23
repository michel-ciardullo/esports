import React from 'react';
import Sprites from "@/Components/Sprites";

function Logos ({height, width, sprite, matchNumber}) {

    let icones;
    if (sprite == "Counter-Strike") icones = "csgo";
    else if (sprite == "League of Legends") icones = "lol";
    else if (sprite == "Dota 2") icones = "dota";
    else if (sprite == "Valorant") icones = "valorant";
    else if (sprite == "Call of Duty") icones = "cd"
    else if (sprite == "Rainbow 6") icones = "r6"
    else if (sprite == "Rocket League") icones = "rl"

    return (
        <a className="game-scroller-element me-3" href={`#${icones}`}>
            <Sprites className={icones} height={height} width={width} sprite={icones} />
            <div className="match-number bg-secondary rounded text-white text-center money">{matchNumber}</div>
        </a>
    )
}

export default function GameScroller({games}) {
    return (
        <div className="game-scroller d-flex py-2 px-2 w-100 mb-3">
            {games.map((icone, i) =>
            <Logos key={i}
                height="80"
                width="80"
                sprite={icone.name}
                matchNumber="4"
            />
            )}
        </div>
    )
}