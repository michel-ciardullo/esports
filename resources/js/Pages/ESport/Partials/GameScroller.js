import React from 'react';


function Sprites ({height, width, sprite, matchNumber}) {
    return (
        <svg width={width} height={height}>
            <use xlinkHref={`/img/sprite.svg#${sprite}`}/>
        </svg>
    )
}


export default function GameScroller() {
    return (
        <div className="game-scroller d-flex py-2 px-2 w-100">
            <Sprites height="100" width="auto" sprite="lol" matchNumber="4"/>
            <Sprites height="100" width="auto" sprite="csgo" matchNumber="3"/>
            <Sprites height="100" width="auto" sprite="valorant" matchNumber="1"/>
            <Sprites height="100" width="auto" sprite="cd" matchNumber="1"/>
        </div>
    )
}