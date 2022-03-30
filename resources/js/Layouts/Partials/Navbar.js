import React  from 'react'
import { Container, Nav, Navbar as BNavbar } from 'react-bootstrap'
import { Link } from '@inertiajs/inertia-react'

import ApplicationLogo from '@/Components/ApplicationLogo'
import { Authenticate, NonAuthentication } from '@/Layouts/Partials/Authenticate'

function NavLink({ href, active, children }) {
    return (
        <Link className={'nav-link' + (active ? ' active' : '')} href={href}>
            <span>{ children }</span>
            <span className="nav-link-indicator"/>
        </Link>
    )
}

export default function Navbar({ auth }) {
    return (
        <BNavbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Link className="navbar-brand" href={route('home')}>
                    <ApplicationLogo width="36" height="36"/>
                </Link>
                <BNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BNavbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink href={route('home')} active={route().current('home')}>
                            Accueil
                        </NavLink>
                        <NavLink href={route('esports.index')} active={route().current('esports.*')}>
                            ESports
                        </NavLink>
                        <NavLink href={route('about')} active={route().current('about')}>
                            À propos
                        </NavLink>
                        <NavLink href={route('contact')} active={route().current('contact')}>
                            Nous-contactez
                        </NavLink>
                        <NavLink href={route('faq')} active={route().current('faq')}>
                            FAQ
                        </NavLink>
                    </Nav>
                    <Nav className="ms-auto nav-profile">
                        {auth.user ? <Authenticate user={auth.user}/> : <NonAuthentication />}
                    </Nav>
                </BNavbar.Collapse>
            </Container>
        </BNavbar>
    )
}
