import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import { GlobalContext } from '@/context'

function ModalTogglerButton({ className, modalDetails }) {
    // The Theme Toggler Button receives not only the theme
    // but also a toggleTheme function from the context
    return (
        <GlobalContext.Consumer>
            {({modalTickets, handleShow}) => (
                <button className={`confrontation-team border-0 ${className}`} onClick={() => handleShow(modalDetails)}>
                    <div>{modalDetails.name}</div>
                    <div>
                        <span className="bg-dark text-light rounded-2 p-1">{modalDetails.pivot.rating}</span>
                    </div>
                </button>
            )}
        </GlobalContext.Consumer>
    )
}

export default function Confrontation({ game, tournament, confrontation }) {
    const color = confrontation.status === 'live' && confrontation.stream_link !== null ? 'success' : 'warning'

    return (
        <>
            <div className="d-flex align-items-center confrontation-item">

                <div className="bg-dark-100 d-flex justify-content-between flex-grow-1">
                    <ModalTogglerButton className="right-facing-competitor" modalDetails={confrontation.teams[0]}/>
                    <span className="p-3">VS</span>
                    <ModalTogglerButton className="left-facing-competitor" modalDetails={confrontation.teams[1]}/>
                </div>
                <div className="btn-group dropend d-none d-lg-block">
                    <Link href={route('esports.confrontation', [game.slug, tournament.slug, confrontation.id])} className={`p-3 rounded-0 border-0 btn btn-${color}`}>
                        <strong className="me-1">{confrontation.date}</strong>{confrontation.time} {confrontation.timezone}
                    </Link>
                    <Link href={route('esports.confrontation', [game.slug, tournament.slug, confrontation.id])} className={`p-3 border-0 btn btn-${color} dropdown-toggle dropdown-toggle-split`} data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </Link>
                </div>
            </div>
        </>
    )
}
