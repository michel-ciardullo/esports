import React, { useState, useEffect } from 'react';
import { Container, Accordion, Button, Tabs, Tab } from 'react-bootstrap';
import { Link } from '@inertiajs/inertia-react';
import Sprites from "@/Components/Sprites";
import BetPopUp from "./BetPopUp"

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

function Confrontations({auth, sprite, date, live, time, teams, confrontationId}) {

    const [modalShow1, setModalShow1] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);


    return (
        <div className="row tourney-content-main mb-1">
            <div className="d-none d-md-flex flex-row justify-content-center align-items-center col-1">
                <span className="rounded-circle circle-animation me-1 shadow" />
                <span className="text-primary d-flex justify-content-center">
                    {(() => {
                        if (live == null) {
                            return (
                                `${date}:${time}`
                            )
                        } else {
                            return (
                                'Live'
                            )
                        }
                    })()}
                </span>
            </div>
            <div className="d-flex flex-column justify-content-center col-5">
                <div>
                    <Sprites height="15px" width="15px" sprite={sprite} fill='gray' className="me-1" />
                    {teams[0].name}
                </div>
                <div>
                    <Sprites height="15px" width="15px" sprite={sprite} fill='gray' className="me-1" />
                    {teams[1].name}
                </div>
            </div>
            <div className="d-flex flex-row justify-content-between col-6 col-md-5">
                <Button className="w-50 me-2" variant="dark" onClick={() => setModalShow1(true)}>{teams[0].pivot.rating}</Button>
                <BetPopUp
                    user={auth.user}
                    team={teams[0].name}
                    rating={teams[0].pivot.rating}
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                />
                <Button className="w-50 me-2" variant="dark" onClick={() => setModalShow2(true)}>{teams[1].pivot.rating}</Button>
                <BetPopUp
                    user={auth.user}
                    team={teams[1].name}
                    rating={teams[1].pivot.rating}
                    show={modalShow2}
                    onHide={() => setModalShow2(false)}
                />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center col-1">
                <a className="arrow">
                    <div className="arrow-top"></div>
                    <div className="arrow-bottom"></div>
                </a>
            </div>
        </div>
    )
}

function TourneyCard({ data, auth, eventKey, sprite, tournaments, tournamentId , confrontations}) {
    return (
        <Accordion.Item className="accordion-item-e-sport mb-3 shadow" eventKey={eventKey}>
            <Accordion.Header>
                <Sprites height="20px" width="20px" sprite={sprite} fill='gray' className="me-2" />
                {tournaments[tournamentId].name}
            </Accordion.Header>
            <Accordion.Body>
                <div className="tourney-content">
                    <div className="row mb-1 tourney-content-head">
                        <div className="d-none d-md-flex col-1"></div>
                        <div className="d-flex flex-row align-items-center col-5">
                            <span className="circle-animation rounded-circle shadow d-md-none d-flex me-1" />
                            <span className="text-primary d-md-none d-flex">live</span>
                        </div>
                        <div className="d-flex flex-row justify-content-between col-6 col-md-5">
                            <span className="w-50 d-block text-center">1</span>
                            <span className="w-50 d-block text-center">2</span>
                        </div>
                        <div className="col-1"></div>
                    </div>
                    {data.confrontations[tournamentId].map((confrontationId,i)=>
                        <Confrontations
                            key={i}
                            confrontationId={confrontationId}
                            auth={auth}
                            sprite={sprite}
                            date={confrontations[confrontationId].date}
                            time={confrontations[confrontationId].time}
                            live={confrontations[confrontationId].live}
                            teams={confrontations[confrontationId].teams}
                        />
                    )}
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}

function TabItem ({ gameId, auth, data, sprite, games, tournaments, confrontations }) {
    return data.tournaments[gameId].map((tournamentId, i) => {
        return (
            <TourneyCard
                key={i}
                data={data}
                eventKey={i.toString()}
                tournamentId={tournamentId}
                auth={auth}
                sprite={sprite}
                games={games}
                tournaments={tournaments}
                confrontations={confrontations}
            />
        )
    })
}

export default function GameShowMatches({ gameId, auth, lives, today, tomorrow, games, tournaments, confrontations }) {

    let activeKeys = [];
    for(let key =0; key< 5; key++) activeKeys.push(key.toString());

    return (
        <div className="game-show-matches mb-4">
            <CardWrapper imgUrl={`${games[gameId].slug}-wallpaper.jpg`} gameName={games[gameId].name} />
            <Tabs defaultActiveKey="encours" id="uncontrolled-tab-example">
                <Tab eventKey="encours" title="En Cours">
                    <Accordion defaultActiveKey={activeKeys} alwaysOpen>
                        {/*<TabItem*/}
                        {/*    gameId={gameId}*/}
                        {/*    auth={auth}*/}
                        {/*    data={lives}*/}
                        {/*    sprite={games[gameId].slug}*/}
                        {/*    games={games}*/}
                        {/*    tournaments={tournaments}*/}
                        {/*    confrontations={confrontations}*/}
                        {/*/>*/}
                    </Accordion>
                </Tab>
                <Tab eventKey="aujourd'hui" title="Aujourd'hui">
                    <Accordion defaultActiveKey={activeKeys} alwaysOpen>
                        {/*<TabItem*/}
                        {/*    gameId={gameId}*/}
                        {/*    auth={auth}*/}
                        {/*    data={today}*/}
                        {/*    sprite={games[gameId].slug}*/}
                        {/*    games={games}*/}
                        {/*    tournaments={tournaments}*/}
                        {/*    confrontations={confrontations}*/}
                        {/*/>*/}
                    </Accordion>
                </Tab>
                <Tab eventKey="demain" title="Demain">
                    <Accordion defaultActiveKey={activeKeys} alwaysOpen>
                        {/*<TabItem*/}
                        {/*    gameId={gameId}*/}
                        {/*    auth={auth}*/}
                        {/*    data={tomorrow}*/}
                        {/*    sprite={games[gameId].slug}*/}
                        {/*    games={games}*/}
                        {/*    tournaments={tournaments}*/}
                        {/*    confrontations={confrontations}*/}
                        {/*/>*/}
                    </Accordion>
                </Tab>
            </Tabs>
        </div>
    )
}
