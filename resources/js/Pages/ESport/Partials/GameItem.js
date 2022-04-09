import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import { Card, Tab, Nav } from 'react-bootstrap'

import TournamentList from './TournamentList'

export default function GameItem({ game }) {
    return (
        <Card className={`card-game border-dark mb-4`} data-esport={game.slug}>

            <Tab.Container defaultActiveKey="lives">

                <div className="position-relative game-header">
                    <div className="game-header-title position-absolute top-0 p-3">
                        <Link href={game.link} className="text-light">
                            <h2 className="mb-0">{game.name}</h2>
                        </Link>
                    </div>
                    <Nav className="nav-scroller flex-nowrap position-absolute bottom-0 start-0 end-0" variant="indicator">
                        <Nav.Item>
                            <Nav.Link eventKey="lives" className="me-3 pt-3">
                                <span className="mx-3">En direct</span>
                                <span className="indicator mt-3"/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="today" className="me-3 pt-3">
                                <span className="mx-3">Aujourd'hui</span>
                                <span className="indicator mt-3"/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tomorrow" className="me-3 pt-3">
                                <span className="mx-3">Demain</span>
                                <span className="indicator mt-3"/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="statistiques" className="pt-3">
                                <span className="mx-3">Statistiques</span>
                                <span className="indicator mt-3"/>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>

                <Card.Body>
                    <Tab.Content>
                        <Tab.Pane eventKey="lives">
                            <TournamentList game={game} tournaments={game.tournaments.now} message="Aucune confrontation en direct à l'heure actuelle."/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="today">
                            <TournamentList game={game} tournaments={game.tournaments.today} message="Pas de confrontation pour aujourd'hui."/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="tomorrow">
                            <TournamentList game={game} tournaments={game.tournaments.tomorrow} message="Pas de confrontation pour demain."/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="statistiques">
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur cum vitae voluptatibus? Assumenda doloribus omnis quisquam unde! Ab at deleniti dolor dolore error fugit ipsa, nihil quibusdam quidem tempora.
                            </Card.Text>
                        </Tab.Pane>
                    </Tab.Content>
                </Card.Body>

            </Tab.Container>
        </Card>
    )
}
