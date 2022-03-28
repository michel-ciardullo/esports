import React from 'react'
import { Link } from '@inertiajs/inertia-react'

export default function Confrontation({ gameSlug, tournamentSlug, confrontation }) {
    const color = confrontation.status === 'live' && confrontation.stream_link !== null ? 'success' : 'warning'

    return (
        <div className="d-flex align-items-center confrontation-item">

            <div className="bg-dark-100 d-flex justify-content-between flex-grow-1">
                <button className="confrontation-team right-facing-competitor border-0">
                    <div>
                        {confrontation.teams[0].name}
                    </div>
                    <div>
                        <span className="bg-dark text-light rounded-2 p-1">
                            {confrontation.teams[0].pivot.rating}
                        </span>
                    </div>
                </button>
                <span className="p-3">VS</span>
                <button className="confrontation-team left-facing-competitor border-0">
                    <div>
                        {confrontation.teams[1].name}
                    </div>
                    <div>
                        <span className="bg-dark text-light rounded-2 p-1">
                            {confrontation.teams[1].pivot.rating}
                        </span>
                    </div>
                </button>
            </div>

            <div className="btn-group dropend d-none d-lg-block">
                <Link href={route('esports.confrontation', [gameSlug, tournamentSlug, confrontation.id])} className={`p-3 rounded-0 border-0 btn btn-${color}`}>
                    <strong className="me-1">{confrontation.date}</strong>{confrontation.time} {confrontation.timezone}
                </Link>
                <Link href={route('esports.confrontation', [gameSlug, tournamentSlug, confrontation.id])} className={`p-3 border-0 btn btn-${color} dropdown-toggle dropdown-toggle-split`} data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                </Link>
            </div>
        </div>
    )
}
