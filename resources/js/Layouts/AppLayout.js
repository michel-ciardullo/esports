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

function NavItems ({ text, src , justify}) {
    return (
        <div className={`d-flex justify-content-${justify} align-items-center`}>
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
                    {/* <Badge bg="secondary" className="text-white me-4">0€</Badge> */}
                    <div className="bg-secondary pe-2 ps-2 pt-1 pb-1 rounded text-white me-sm-4 me-0 money">500€</div>
                </Link>
            </li>
            <div class="vl me-3 d-none d-md-block"></div>
            <NavDropdown 
                title={ <NavItems text={ user.name } src="/img/fakeprofile.svg" justify="center"/> } 
                id="basic-nav-dropdown"
            >
                <NavDropdown.Item href={route('profile')}>
                    <NavItems text="Mon Profil" src="/img/person-circle.svg" justify="start" />
                </NavDropdown.Item>
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
                    <NavItems text="Mes Tickets" src="/img/logo-paris.svg" justify="start" />
                </Link>
                <NavDropdown.Divider />
                <Link
                    href={route('logout')}
                    className="dropdown-item"
                    method="post"
                    as="button"
                >
                    <NavItems text="Déconnexion" src="/img/logo-disconnect.svg" justify="start" />
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
