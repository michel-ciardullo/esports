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

function Confrontations(props) {

    const [modalShow1, setModalShow1] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);

    return (
        <div className="row tourney-content-main">
            <div className="d-none d-md-flex flex-row justify-content-center align-items-center col-1">
                <span className="rounded-circle circle-animation me-1 shadow" />
                <span className="text-primary d-flex justify-content-center">{props.label}</span>
            </div>
            <div className="d-flex flex-column justify-content-center col-5">
                <div>
                    <Sprites height="15px" width="15px" sprite={props.sprite} fill='gray' className="me-1" />
                    {props.team1}
                </div>
                <div>
                    <Sprites height="15px" width="15px" sprite={props.sprite} fill='gray' className="me-1" />
                    {props.team2}
                </div>
            </div>
            <div className="d-flex flex-row justify-content-between col-6 col-md-5">
                <Button className="w-50 me-2" variant="dark" onClick={() => setModalShow1(true)}>{props.rating1}</Button>
                <BetPopUp
                    user={props.user}
                    team={props.team1}
                    rating={props.rating1}
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                />
                <Button className="w-50" variant="dark" onClick={() => setModalShow2(true)}>{props.rating2}</Button>
                <BetPopUp
                    user={props.user}
                    team={props.team2}
                    rating={props.rating2}
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

function TourneyCard({ user, eventKey, label, tourney, sprite, team1, team2, rating1, rating2 }) {
    return (
        <Accordion.Item className="accordion-item-e-sport mb-3 shadow" eventKey={eventKey}>
            <Accordion.Header>
                <Sprites height="20px" width="20px" sprite={sprite} fill='gray' className="me-2" />
                {tourney}
            </Accordion.Header>
            <Accordion.Body>
                <div className="tourney-content">
                    <div className="row mb-1 tourney-content-head">
                        <div className="d-none d-md-flex col-1"></div>
                        <div className="d-flex flex-row align-items-center col-5">
                            <span className="circle-animation rounded-circle shadow d-md-none d-flex me-1" />
                            <span className="text-primary d-md-none d-flex">{label}</span>
                        </div>
                        <div className="d-flex flex-row justify-content-between col-6 col-md-5">
                            <span className="w-50 d-block text-center">1</span>
                            <span className="w-50 d-block text-center">2</span>
                        </div>
                        <div className="col-1"></div>
                    </div>
                    <Confrontations
                        user={user}
                        sprite={sprite}
                        label={label}
                        team1={team1}
                        team2={team2}
                        rating1={rating1}
                        rating2={rating2}
                    />
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}

function TabItem ({ user, eventKey, date, tourney, sprite, team1, team2, rating1, rating2 }) {
    return (
        <Accordion defaultActiveKey="0" alwaysOpen>
            <TourneyCard
                user={user}
                eventKey={eventKey}
                label={date}
                tourney={tourney}
                sprite={sprite}
                team1={team1}
                team2={team2}
                rating1={rating1}
                rating2={rating2}
            />
        </Accordion>
    )
}

export default function GameShowMatches(props) {

    let gameName;
    if (props.games.name == "Counter-Strike") gameName = "csgo";
    else if (props.games.name == "League of Legends") gameName = "lol";
    else if (props.games.name == "Dota 2") gameName = "dota";
    else if (props.games.name == "Valorant") gameName = "valorant";
    else if (props.games.name == "Call of Duty") gameName = "cd"
    else if (props.games.name == "Rainbow 6") gameName = "r6"
    else if (props.games.name == "Rocket League") gameName = "rl"
    else if (props.games.name == "StarCraft 2") gameName = "starcraft"

    return (
        <div className="game-show-matches mb-4">
            <CardWrapper imgUrl={`${gameName}-wallpaper.jpg`} gameName={props.games.name} />
            <Tabs defaultActiveKey="encours" id="uncontrolled-tab-example">
                <Tab eventKey="encours" title="En Cours">
                    <TabItem
                        user={props.user}
                        eventKey="0"
                        date="Live"
                        tourney="CS:GO - Esl League"
                        sprite={gameName}
                        team1="Astralis Team"
                        team2="Astralis Team"
                        rating1="1.3"
                        rating2="2.5"
                    />
                </Tab>
                <Tab eventKey="aujourd'hui" title="Aujourd'hui">
                    <TabItem
                        user={props.user}
                        eventKey="0"
                        date="Live"
                        tourney="CS:GO - Esl League"
                        sprite={gameName}
                        team1="Astralis Team"
                        team2="Astralis Team"
                        rating1="1.3"
                        rating2="2.5"
                    />
                </Tab>
                <Tab eventKey="demain" title="Demain">
                    <TabItem
                        user={props.user}
                        eventKey="0"
                        date="Live"
                        tourney="CS:GO - Esl League"
                        sprite={gameName}
                        team1="Astralis Team"
                        team2="Astralis Team"
                        rating1="1.3"
                        rating2="2.5"
                    />
                </Tab>
            </Tabs>
        </div>
    )
}
