import React from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from '@inertiajs/inertia-react';

export default function LiveNow({ livesNow }) {
    let icon = livesNow.name;
    if (icon === 'Counter-Strike') icon = 'csgo';
    else if (icon === 'Dota 2') icon = 'dota2';
    else if (icon === 'League of Legends') icon = 'lol';
    else if (icon === 'Valorant') icon = 'valorant';

    return (
        <Link className={`position-relative text-center px-3 pt-3 pb-2 icon-game-${icon}`} href={route('esports.show', livesNow.slug)}>
            <Badge style={{ top: '.5rem', right: '.5rem' }} className="position-absolute" variant="success">
                {livesNow.count}
            </Badge>
            <svg width="100" height="100">
                <use xlinkHref={`/img/sprite.svg#${icon}`}/>
            </svg>
            <span className="d-block mt-2">{livesNow.name}</span>
        </Link>
    )
}
