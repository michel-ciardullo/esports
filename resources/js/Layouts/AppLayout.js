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
import ApplicationLogo from "@/Components/ApplicationLogo";

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

function Authenticate({ user }) {
    return (
        <>
            <li className="nav-item d-flex justify-content-center align-items-center">
                <Link className="nav-link" href="#">
                    {/* <Badge bg="secondary" className="text-white me-4">0€</Badge> */}
                    <div className="bg-secondary pe-2 ps-2 pt-1 pb-1 rounded text-white me-sm-4 me-0 money">{user.wallet.balance}€</div>
                </Link>
            </li>
            <div class="vl me-3 d-none d-md-flex"></div>
            <NavDropdown 
                title={ <NavItems text={ user.name } src="/img/person-circle.svg" justify="center"/> } 
                id="basic-nav-dropdown"
                className="d-block d-md-flex justify-content-center align-items-center"
            >
                <NavDropdown.Item href={route('profile')}>
                    <NavItems text="Profil" src="/img/person-circle.svg" justify="start" />
                </NavDropdown.Item>
                <Link
                    href={route('wallet.index')}
                    className="dropdown-item"
                >
                    <NavItems text="Portefeuille" src="/img/wallet2.svg" justify="start" />
                </Link>
                <Link
                    href="#tickets"
                    className="dropdown-item"
                >
                    <NavItems text="Tickets" src="/img/logo-paris.svg" justify="start" />
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
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow">
                <Container>
                    <Link className="navbar-brand" href={route('home')}>
                        <ApplicationLogo height="60px" className="me-3"/>
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
            <main className="margin-main pb-3">
                {children}
            </main>
        </>
    );
}
