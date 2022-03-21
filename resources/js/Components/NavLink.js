import React from 'react';
import {Link} from '@inertiajs/inertia-react';

export default function NavLink({ label, name }) {
    const active = route().current(name)

    return (
        <Link className={'nav-link' + (active ? ' active' : '')} href={route(name)}>
            <span>{ label }</span>
            <span className="nav-link-indicator"/>
        </Link>
    )
}