import React  from 'react'
import { NavDropdown } from 'react-bootstrap'
import { Link } from '@inertiajs/inertia-react'

export function Authenticate({ user }) {
    return (
        <>
            <div className="d-flex mt-3 mt-lg-0">
                <Link className="btn btn-outline-warning flex-grow-1 me-3" href={route('wallet.index')}>
                    <span>{user.wallet.balance}€</span>
                </Link>

                <Link className="btn btn-outline-info position-relative me-lg-3" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                    </svg>
                    <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                </span>
                </Link>
            </div>

            <NavDropdown title={user.name} id="basic-nav-dropdown" className="mb-lg-0 mb-3">
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
