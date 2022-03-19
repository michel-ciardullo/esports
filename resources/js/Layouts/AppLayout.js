import React from 'react';
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
    Badge
} from 'react-bootstrap';
import { Link } from '@inertiajs/inertia-react';
import ApplicationLogo from "@/Components/ApplicationLogo";

function Authenticate({ user }) {
    return (
        <>
            <Link className="nav-link" href={route('wallet.index')}>
                <div>
                    <Badge className="p-2" variant="outline-primary">{user.wallet.balance}€</Badge>
                </div>
            </Link>
            <NavDropdown title={user.name} id="basic-nav-dropdown">
                <Link
                    href={route('profile')}
                    className="dropdown-item"
                >
                    Mon Profil
                </Link>
                <Link
                    href={route('wallet.index')}
                    className="dropdown-item"
                >
                    Mon Portefeuille
                </Link>
                <NavDropdown.Divider />
                <Link
                    href={route('logout')}
                    className="dropdown-item"
                    method="post"
                    as="button"
                >
                    Déconnexion
                </Link>
            </NavDropdown>
        </>
    )
}

function NonAuthentication() {
    return (
        <>
            <Link className="nav-link" href={route('login')}>Se connecter</Link>
            <Link className="ms-lg-3 mt-lg-0 mt-3 btn btn-outline-primary" href={route('register')}>S'inscrire</Link>
        </>
    )
}

function NavLink({ label, name }) {
    const active = route().current(name)

    return (
        <Link className={'nav-link' + (active ? ' active' : '')} href={route(name)}>
            <span>{ label }</span>
            <span className="nav-link-indicator"/>
        </Link>
    )
}

export default function AppLayout({ auth, children }) {
    return (
        <>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Link className="navbar-brand" href={route('home')}>
                        <ApplicationLogo width="36" height="36"/>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <NavLink name="home" label="Home"/>
                            <NavLink name="esports.index" label="ESports"/>
                            <NavLink name="about" label="À propos"/>
                            <NavLink name="contact" label="Contact"/>
                            <NavLink name="faq" label="FAQ"/>
                        </Nav>
                        <Nav className="ms-auto nav-profile">
                            {auth.user ? <Authenticate user={auth.user}/> : <NonAuthentication />}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Content */}
            <main className="pb-3">
                {children}
            </main>
        </>
    );
}
