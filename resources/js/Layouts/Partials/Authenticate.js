import React  from 'react'
import { NavDropdown, Badge } from 'react-bootstrap'
import { Link } from '@inertiajs/inertia-react'

export function Authenticate({ user }) {
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

export function NonAuthentication() {
    return (
        <>
            <Link className="nav-link" href={route('login')}>Se connecter</Link>
            <Link className="ms-lg-3 mt-lg-0 my-3 my-lg-0 btn btn-outline-primary" href={route('register')}>S'inscrire</Link>
        </>
    )
}

