import React from 'react'
import { Link, useForm } from '@inertiajs/inertia-react'
import { GlobalContext } from '@/context'

function OffCanvasTogglerButton({ handleShow, className, confrontation, result }) {
    const { post } = useForm({
        confrontationId: confrontation.id,
        result,
        redirect: route().current()
    })

    const submit = (e) => {
        e.preventDefault()

        post(route('ticket.add'), {
            preserveScroll: true,
            onSuccess: () => handleShow(),
        })
    }

    const { name, pivot } = confrontation.teams[result]

    // The Theme Toggler Button receives not only the theme
    // but also a toggleTheme function from the context
    return (
        <form
            onSubmit={submit}
            noValidate
        >
            <button
                className={`confrontation-team border-0 ${className}`}
            >
                <div>{name}</div>
                <div>
                    <span className="bg-dark text-light rounded-2 p-1">{pivot.rating}</span>
                </div>
            </button>
        </form>
    )
}

export default function ConfrontationItem({ confrontation }) {
    const color = confrontation.status === 'live' && confrontation.stream_link !== null ? 'success' : 'warning'

    return (
        <div className="d-flex align-items-center confrontation-item">
            <GlobalContext.Consumer>
                {({handleShow}) => (
                    <div className="bg-dark-100 d-flex justify-content-between flex-grow-1">
                        <OffCanvasTogglerButton
                            handleShow={handleShow}
                            className="right-facing-competitor"
                            confrontation={confrontation}
                            result={0}
                        />
                        <span className="p-3">VS</span>
                        <OffCanvasTogglerButton
                            handleShow={handleShow}
                            className="left-facing-competitor"
                            confrontation={confrontation}
                            result={1}
                        />
                    </div>
                )}
            </GlobalContext.Consumer>
            <div className="btn-group dropend d-none d-lg-block mb-2">
                <Link href={confrontation.link} className={`p-3 rounded-0 border-0 btn btn-${color}`}>
                    <strong className="me-1">{confrontation.date}</strong>{confrontation.time} {confrontation.timezone}
                </Link>
                <Link href={confrontation.link} className={`p-3 border-0 btn btn-${color} dropdown-toggle dropdown-toggle-split`} data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                </Link>
            </div>
        </div>
    )
}
