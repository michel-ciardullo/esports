import React from 'react';

function Confrontation({ confrontation }) {
    const ratings = confrontation.teams.map((team, j) =>
        <td key={j}>
            <div className="bg-dark text-center p-1 text-light">
                <a href="#" className="d-block bg-dark text-center p-1 text-light">
                    <span className="d-block">{team.name}</span>
                    <span className="d-block">{team.pivot.rating}</span>
                </a>
            </div>
        </td>
    )
    return (
        <tr className="border-top border-primary">
            <th scope="row">
                <span>Live now</span>
                <em className="d-block">{confrontation.time}</em>
            </th>
            {ratings}
        </tr>
    )
}

function ConfrontationList({ confrontations }) {
    return confrontations.map((confrontation, i) => <Confrontation key={i} confrontation={confrontation} />)
}

function Tournament({ tournament }) {
    return (
        <article className="card mb-3">
            <header className="d-lg-flex">
                <div className="d-flex justify-content-start align-items-top p-3" style={{ flex: '.3' }}>
                            <span className="rounded-circle bg-success" style={{
                                width: '34px',
                                height: '34px'
                            }} />
                    <div className="ms-3 d-flex flex-column">
                        <span>{tournament.name}</span>
                        <em>Time</em>
                    </div>
                </div>
                <div style={{
                    flex: '3',
                    clipPath: 'polygon(3% 0, 100% 0, 100% 100%, 0% 100%)'
                }}>
                    <div
                        className="bg-dark w-100 p-3"
                        style={{
                            backgroundImage: 'url(https://images.ctfassets.net/j95d1p8hsuun/29qUXMV0WBycRYM3YQCzzl/a214b2faf007454eae0b7719bea6bf37/1920x720-NWcom2-keyart.jpg)',
                            height: '150px'
                        }}
                    />
                </div>
            </header>
            <section className="p-3">
                <table className="table table-borderless text-light mb-0">
                    <thead>
                    <tr>
                        <th scope="col">See all game</th>
                        <th scope="col">
                            <span className="d-block text-center">1</span>
                        </th>
                        <th scope="col">
                            <span className="d-block text-center">2</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        <ConfrontationList confrontations={tournament.confrontations}/>
                    </tbody>
                </table>
            </section>
        </article>
    )
}

export default function GameTournamentList(props) {
    return props.tournaments
        ? props.tournaments.map((tournament, i) =>
            <Tournament key={i} tournament={tournament} />
        )
        : null
}
