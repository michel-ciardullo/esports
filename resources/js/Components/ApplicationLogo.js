import React from 'react';

export default function ApplicationLogo({ className, width, height }) {
    return (
        <img className={className} height={height} width="auto" src="/img/Logo.svg"/>
    );
}
