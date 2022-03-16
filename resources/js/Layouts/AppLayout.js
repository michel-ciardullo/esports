import React from 'react';
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
    Badge
} from 'react-bootstrap';
import {Link} from '@inertiajs/inertia-react';
import ApplicationLogoLong from "@/Components/ApplicationLogoLong";

function NavItems ({ text, src }) {
    return (
        <div className="d-flex justify-content-start align-items-center">
            <img 
                className="thumbnail-image" 
                src={src} 
                alt="user pic"
            />
            <span className="ms-3 text-white">{text}</span> 
        </div>
    )
}

function Profile({ user }) {
    return (
        <>
            <li className="nav-item d-flex justify-content-center align-items-center">
                <Link className="nav-link" href="#">
                    <Badge bg="secondary" className="text-white me-4">0€</Badge>
                </Link>
            </li>
            <NavDropdown 
                title={ <NavItems text={ user.name } src="/img/fakeprofile.svg"/> } 
                id="basic-nav-dropdown"
            >
                <NavDropdown.Item href={route('profile')}>
                    <NavItems text="mon profil" src="/img/fakeprofile.svg" />
                </NavDropdown.Item>
                <Link
                    href="/tickets"
                    className="dropdown-item"
                >
                    <NavItems text="mes tickets" src="/img/logo-paris.svg" />
                </Link>
                <NavDropdown.Divider />
                <Link
                    href={route('logout')}
                    className="dropdown-item"
                    method="post"
                    as="button"
                >
                    <NavItems text="déconnexion" src="/img/logo-disconnect.svg" />
                </Link>
            </NavDropdown>
        </>
    )
}

function NotAuth() {
    return (
        <>
            <Link className="nav-link" href={route('login')}>Se connecter</Link>
            <Link className="ms-lg-3 mt-lg-0 mt-3 btn btn-secondary" href={route('register')}>S'inscrire</Link>
        </>
    )
}

export default function AppLayout({ auth, children, games }) {
    return (
        <>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Link className="navbar-brand" href={route('home')}>
                        <ApplicationLogoLong height="60px"/>
                    </Link>
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
