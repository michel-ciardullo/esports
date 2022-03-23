import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import { Container, Tab, Nav, Accordion } from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';
import LiveNowList from './Partials/LiveNowList';

function Confrontation({ confrontation }) {
    const team1 = confrontation.teams[0]
    const team2 = confrontation.teams[1]

    return (
        <div className="d-flex justify-content-between align-items-center confrontation">
            <div className="flex-fill d-flex align-items-center ms-3" style={{width: '100px'}}>
                <span className="rounded-circle bg-success" style={{ height: '24px', width: '24px' }} />
                <span className="ms-2">{confrontation.status}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-fill teams-items">
                <div className="d-flex align-items-center teams-item p-1" style={{width: '200px'}}>
                    <img width={46} height={46} src="/img/teams/mad-lions-logo.png" alt="Mad-Lions-Logo"/>
                    <span className="ms-2">{team1.name}</span>
                </div>
                <span className="vs">VS</span>
                <div className="d-flex flex-row-reverse align-items-center teams-item p-1" style={{width: '200px'}}>
                    <img width={46} height={46} src="/img/teams/ence-logo.png" alt="Ence-Logo"/>
                    <span className="me-2">{team2.name}</span>
                </div>
            </div>
            <div className="flex-fill d-flex justify-content-end align-items-center" style={{width: '100px'}}>
                <span className="me-3">{confrontation.date} - {confrontation.time}</span>
                <a className="d-flex align-items-center p-1" href="#" style={{ height: '68px', backgroundColor: '#525252'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-caret-right" viewBox="0 0 16 16">
                        <path
                            d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                    </svg>
                </a>
            </div>
        </div>
    )
}

function ConfrontationList({ confrontations }) {
    return confrontations.map((confrontation, i) => <Confrontation key={i} confrontation={confrontation} />)
}

function Tournament({ tournament, eventKey }) {

    return (
        <Accordion.Item eventKey={eventKey} className="tournament-accordion">
            <Accordion.Header>{ tournament.name }</Accordion.Header>
            <Accordion.Body className="p-0">
                <ConfrontationList confrontations={tournament.confrontations} />
            </Accordion.Body>
        </Accordion.Item>
    )
}

function TournamentList({ name, tournaments }) {
    const livesNow  = []
    let liveNow     = {}

    tournaments.forEach(tournament => {
        liveNow.name = tournament.name
        liveNow.confrontations = []

        tournament.confrontations.forEach(confrontation => {
            if (confrontation.status === 'live')
            {
                liveNow.confrontations.push(confrontation)
            }
        })

        if (liveNow.confrontations.length > 0) {
            livesNow.push(liveNow)
        }

        liveNow = {}
    })

    const livesNowTournaments = livesNow.map((liveNow, i) => <Tournament key={i} eventKey={`${i}`} tournament={liveNow} />)
    const keys = []
    livesNowTournaments.forEach((a, i) => keys.push(`${i}`))

    return (
        <div className="card mt-4">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <header className="game-header">
                    <h2>{name}</h2>
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="first" className="nav-link-confrontation">
                                <span className="label">En cours</span>
                                <span className="indicator" />
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second" className="nav-link-confrontation">
                                <span className="label">Aujourd'hui</span>
                                <span className="indicator" />
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third" className="nav-link-confrontation">
                                <span className="label">Demain</span>
                                <span className="indicator" />
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </header>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                        <Accordion defaultActiveKey={keys}>
                            {livesNowTournaments}
                        </Accordion>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        a
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                        b
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    )
}

function GameList({ games }) {
    return games.map((game, i) =>
        <TournamentList key={i} name={game.name} tournaments={game.tournaments} />
    )
}

export default function ESportIndex({ auth, games }) {

    const livesNow  = []
    let liveNow     = {}

    games.forEach(game => {
        liveNow.id      = game.id
        liveNow.slug    = game.slug
        liveNow.name    = game.name
        liveNow.count   = 0

        game.tournaments.forEach(({ confrontations }) => {
            liveNow.count += confrontations.filter(({ status }) => status === 'live').length
        })

        if (liveNow.count > 0)
        {
            livesNow.push(liveNow)
        }

        liveNow = {}
    })

    return (
        <AppLayout auth={auth}>
            <Head title="ESports" />

            <Container className="mt-4">

                <h1 className="mb-0">ESports</h1>
                <hr className="my-4"/>

                <LiveNowList livesNow={livesNow} />
                <GameList games={games} />

            </Container>
        </AppLayout>
    );
}
