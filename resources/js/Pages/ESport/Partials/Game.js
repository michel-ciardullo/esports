import React from 'react'
import { Accordion, Tab, Tabs } from 'react-bootstrap'

import TournamentList from './TournamentList'

function CardWrapper({ imgUrl, gameName }) {

    return (
        <div className="d-flex card-wrapper" style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../img/${imgUrl})`,
            backgroundSize: 'cover',
            borderRadius: '10px 10px 0 0',
            backgroundPosition: 'center'
        }}>
            <h2 className="mt-3 ms-3">{gameName}</h2>
        </div>
    )
}

export default function Game({ auth, game }) {

    return (
        <div className="game-show-matches mb-4">
            <CardWrapper imgUrl={`${game.slug}-wallpaper.jpg`} gameName={game.name} />
            <Tabs defaultActiveKey="encours" id="uncontrolled-tab-example">
                <Tab eventKey="encours" title="En Cours">
                        <TournamentList
                            auth={auth}
                            tournaments={game.tournaments.now}
                            gameSlug={game.slug}
                            message="Aucune confrontation en direct à l'heure actuelle."
                        />
                </Tab>
                <Tab eventKey="aujourd'hui" title="Aujourd'hui">
                        <TournamentList
                            auth={auth}
                            tournaments={game.tournaments.today}
                            gameSlug={game.slug}
                            message="Pas de confrontation pour aujourd'hui."
                        />
                </Tab>
                <Tab eventKey="demain" title="Demain">
                        <TournamentList
                            auth={auth}
                            tournaments={game.tournaments.tomorrow}
                            gameSlug={game.slug}
                            message="Pas de confrontation pour demain."
                        />
                </Tab>
                <Tab eventKey="stats" title="Statistiques">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur cum vitae voluptatibus? Assumenda doloribus omnis quisquam unde! Ab at deleniti dolor dolore error fugit ipsa, nihil quibusdam quidem tempora.
                    </p>
                </Tab>
            </Tabs>
        </div>
    )
}
