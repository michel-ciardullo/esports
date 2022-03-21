import React from 'react';
import Sprites from "@/Components/Sprites";

function Logos ({height, width, sprite, fill, matchNumber}) {
    return (
        <div className="game-scroller-element me-3">
            <Sprites height={height} width={width} sprite={sprite} fill={fill} />
            <div className="match-number bg-secondary rounded text-white text-center money">{matchNumber}</div>
        </div>
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
                fill="gray"
            />
            <Logos
                height="80"
                width="80"
                sprite="csgo"
                matchNumber="3"
                fill="gray"
            />
            <Logos
                height="80"
                width="80"
                sprite="valorant"
                matchNumber="1"
                fill="#dc3d4b"
            />
            <Logos
                height="80"
                width="80"
                sprite="cd"
                matchNumber="1"
                fill="gray"
            />
            <Logos
                height="80"
                width="80"
                sprite="dota"
                matchNumber="1"
                fill="gray"
            />
        </div>
    )
}