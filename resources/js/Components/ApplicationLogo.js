import React from 'react';

export default function ApplicationLogo({ height, className }) {
    return (
        <img className={className} height={height} width="auto" src="/img/Logo.svg"/>
    );
}
