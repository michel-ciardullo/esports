import React from 'react';
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
    Badge
} from 'react-bootstrap';
import {Link} from '@inertiajs/inertia-react';

function Profile({ user }) {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" href="#">
                    <Badge bg="warning" pill className="text-dark">0€</Badge>
                </Link>
            </li>
            <NavDropdown title={user.name} id="basic-nav-dropdown">
                <NavDropdown.Item href={route('profile')}>Profile</NavDropdown.Item>
                <Link
                    href={route('wallet.index')}
                    className="dropdown-item"
                >
                    Mon Portefeuille
                </Link>
                <Link
                    href="#tickets"
                    className="dropdown-item"
                >
                    Mes tiquets
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

function NotAuth() {
    return (
        <>
            <Link className="nav-link" href={route('login')}>Se connecter</Link>
            <Link className="ms-lg-3 mt-lg-0 mt-3 btn btn-outline-warning" href={route('register')}>S'inscrire</Link>
        </>
    )
}

export default function AppLayout({ auth, children, games }) {
    return (
        <>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Link className="navbar-brand" href={route('home')}>GE</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Link className={'nav-link' + (route().current('home') ? ' active' : '')} href={route('home')}>
                                Accueil
                            </Link>
                            <NavDropdown title="Jeux" active={route().current('games.*')}>
                                {games.map(({id, name}, i) =>
                                    <Link key={i} className="dropdown-item" href={route('games.show', id)}>{name}</Link>
                                )}
                            </NavDropdown>
                            <Nav.Link href="#home">À propos</Nav.Link>
                            <Link className={'nav-link' + (route().current('contact') ? ' active' : '')} href={route('contact')}>
                                Contact
                            </Link>
                            <Link className={'nav-link' + (route().current('faq') ? ' active' : '')} href={route('faq')}>
                                FAQ
                            </Link>
                        </Nav>
                        <Nav className="ms-auto">
                            {auth.user ? <Profile user={auth.user}/> : <NotAuth />}
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
