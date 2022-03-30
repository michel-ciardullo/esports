import React, {useState, useEffect} from 'react'
import { Link } from '@inertiajs/inertia-react'
import {Button} from 'react-bootstrap'

import BetPopUp from './BetPopUp'
import Sprites from '@/Components/Sprites';

export default function Confrontation({ auth, gameSlug, tournamentSlug, confrontation }) {
    const [modalShow1, setModalShow1] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);

    return (
        <div className="row tourney-content-main mb-1">
            <div className="d-flex flex-row justify-content-center align-items-center col-2 col-md-1">
                    {(() => {
                        if (confrontation.status === 'live' && confrontation.stream_link !== null) {
                            return (
                                <>
                                    <span className="rounded-circle circle-animation me-1 shadow" />
                                    <span className="d-none text-primary d-md-flex justify-content-center">live</span>
                                </>
                            )
                        } else {
                            return (
                                <span className="text-primary d-flex justify-content-center">{confrontation.time}</span>
                            )
                        }
                    })()}
            </div>
            <div className="d-flex flex-column justify-content-center col-4 col-md-5">
                <div className="team-name">
                    <Sprites height="15px" width="15px" sprite={gameSlug} fill='gray' className="me-1" />
                    {confrontation.teams[0].name}
                </div>
                <div className="team-name">
                    <Sprites height="15px" width="15px" sprite={gameSlug} fill='gray' className="me-1" />
                    {confrontation.teams[1].name}
                </div>
            </div>
            <div className="d-flex flex-row justify-content-between col-5">
                <Button className="text-primary w-50 me-2" variant="dark" onClick={() => setModalShow1(true)}>{confrontation.teams[0].pivot.rating}</Button>
                <BetPopUp
                    user={auth.user}
                    team={confrontation.teams[0].name}
                    rating={confrontation.teams[0].pivot.rating}
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                />
                <Button className="text-primary w-50" variant="dark" onClick={() => setModalShow2(true)}>{confrontation.teams[1].pivot.rating}</Button>
                <BetPopUp
                    user={auth.user}
                    team={confrontation.teams[1].name}
                    rating={confrontation.teams[1].pivot.rating}
                    show={modalShow2}
                    onHide={() => setModalShow2(false)}
                />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center col-1">
                <Link className="arrow" href={route('esports.confrontation', [gameSlug, tournamentSlug, confrontation.id])}>
                    <div className="arrow-top"></div>
                    <div className="arrow-bottom"></div>
                </Link>
            </div>
        </div>
    )
}
