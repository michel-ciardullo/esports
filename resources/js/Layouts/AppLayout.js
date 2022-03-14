import React from 'react';
import {
    Container,
    Nav,
    Navbar,
    NavDropdown
} from 'react-bootstrap';
import {Link} from "@inertiajs/inertia-react";

export default function AppLayout({ children, games })
{
    return (
        <>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Link className="navbar-brand" href={route('home')}>GE</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Link className={'nav-link' + (route().current('home') ? ' active' : '')} href={route('home')}>Accueil</Link>
                            <NavDropdown title="Jeux" active={route().current('games.*')}>
                                {games.map(({id, name}, i) =>
                                    <Link key={i} className="dropdown-item" href={route('games.show', id)}>{name}</Link>
                                )}
                            </NavDropdown>
                            <NavDropdown title="Tournois">
                                <NavDropdown.Item href="#">Tournoi 1</NavDropdown.Item>
                                <NavDropdown.Item href="#">Tournoi 2</NavDropdown.Item>
                                <NavDropdown.Item href="#">Tournoi 3</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#home">À propos</Nav.Link>
                            <Nav.Link href="#home">Contact</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            <Link className="nav-link" href={route('login')}>Se connecter</Link>
                            <Link className="ms-lg-3 mt-lg-0 mt-3 btn btn-outline-warning" href={route('register')}>S'inscrire</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Content */}
            <main>
                {children}
            </main>
        </>
    );
}
