import React from 'react'
import {Link} from "@inertiajs/inertia-react";

export default function Confrontation({ gameSlug, tournamentSlug, confrontation }) {
    return (
        <div className="bg-dark-100 d-flex align-items-center">
            <div className="flex-grow-1 p-3">
                a
            </div>
            <div className="btn-group dropend">
                <Link href={route('esports.confrontation', [gameSlug, tournamentSlug, confrontation.id])} className="rounded-0 p-3 btn btn-danger">
                    <strong className="me-1">{confrontation.date}</strong>{confrontation.time} {confrontation.timezone}
                </Link>
                <Link href={route('esports.confrontation', [gameSlug, tournamentSlug, confrontation.id])} className="p-3 btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                </Link>
            </div>
        </div>
    )
}
