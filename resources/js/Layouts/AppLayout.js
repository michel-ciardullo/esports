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
                    <Navbar.Brand href="#home">GE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link href="#home">Accueil</Nav.Link>
                            <NavDropdown title="Jeux">
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
                            <Link className="btn btn-outline-success" href={route('login')}>Se connecter</Link>
                            <Link className="ms-lg-3 mt-lg-0 mt-3 btn btn-success" href={route('register')}>S'inscrire</Link>
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
