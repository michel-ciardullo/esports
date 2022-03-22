import React from 'react';
import Sprites from "@/Components/Sprites";

function Logos ({height, width, sprite, matchNumber}) {
    return (
        <a className="game-scroller-element me-3" href={`#${sprite}`}>
            <Sprites className={sprite} height={height} width={width} sprite={sprite} />
            <div className="match-number bg-secondary rounded text-white text-center money">{matchNumber}</div>
        </a>
    )
}

export default function GameScroller() {
    return (
        <div className="game-scroller d-flex py-2 px-2 w-100 mb-3">
            <Logos
                height="80"
                width="80"
                sprite="lol"
                matchNumber="4"
            />
            <Logos
                height="80"
                width="80"
                sprite="csgo"
                matchNumber="3"
            />
            <Logos
                height="80"
                width="80"
                sprite="valorant"
                matchNumber="1"
            />
            <Logos
                height="80"
                width="80"
                sprite="cd"
                matchNumber="1"
            />
            <Logos
                height="80"
                width="80"
                sprite="dota"
                matchNumber="1"
            />
        </div>
    )
}