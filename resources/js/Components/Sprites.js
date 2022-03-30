import React from 'react';

export default function Sprites ({height, width, sprite, fill, className}) {
    return (
        <svg className={className} fill={fill} width={width} height={height}>
            <use xlinkHref={`/img/sprite.svg#${sprite}`}/>
        </svg>

    )
}