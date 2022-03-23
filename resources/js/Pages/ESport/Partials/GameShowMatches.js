import React, { useState, useEffect } from 'react';
import { Container, Accordion, Button, Tabs, Tab } from 'react-bootstrap';
import { Link } from '@inertiajs/inertia-react';
import Sprites from "@/Components/Sprites";
import NavLink from "@/Components/NavLink";

function CardWrapper({ imgUrl, gameName }) {

    return (
        <div className="d-flex card-wrapper" style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../img/${imgUrl})`,
            backgroundSize: 'cover',
            borderRadius: '10px 10px 0 0'
        }}>
            <h2 className="mt-3 ms-3">{gameName}</h2>
        </div>
    )
}

function TourneyCard({ eventKey, label, tourney, sprite, team1, team2, rating1, rating2 }) {
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
                        <div className="d-flex flex-column justify-content-center col-5"><span className="text-primary d-md-none d-flex justify-content-center">{label}</span></div>
                        <div className="d-flex flex-row justify-content-between col-6 col-md-5">
                            <span className="w-50 d-block text-center">1</span>
                            <span className="w-50 d-block text-center">2</span>
                        </div>
                        <div className="col-1"></div>
                    </div>
                    <div className="row tourney-content-main">
                        <div className="d-none d-md-flex flex-column justify-content-center col-1"><span className="text-primary d-flex justify-content-center">{label}</span></div>
                        <div className="d-flex flex-column justify-content-center col-5">
                            <div>
                                <Sprites height="15px" width="15px" sprite='csgo' fill='gray' className="me-1" />
                                {team1}
                            </div>
                            <div>
                                <Sprites height="15px" width="15px" sprite='csgo' fill='gray' className="me-1" />
                                {team2}
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between col-6 col-md-5">
                            <Button className="w-50" variant="dark" type="submit">{rating1}</Button>
                            <Button className="ms-1 w-50" variant="dark" type="submit">{rating2}</Button>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center col-1">
                            <div className="arrow">
                                <div className="arrow-top"></div>
                                <div className="arrow-bottom"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}

function TabItem ({ eventKey, date, tourney, sprite, team1, team2, rating1, rating2 }) {
    return (
        <Accordion defaultActiveKey="0" alwaysOpen>
            <TourneyCard
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

    return (
        <div className="game-show-matches">
            <CardWrapper imgUrl="csgowallpaper1.jpg" gameName="Counter-Strike" />
            <Tabs defaultActiveKey="encours" id="uncontrolled-tab-example">
                <Tab eventKey="encours" title="En Cours">
                    <TabItem
                        eventKey="0"
                        date="Live"
                        tourney="CS:GO - Esl League"
                        sprite="csgo"
                        team1="Astralis Team"
                        team2="Astralis Team"
                        rating1="1.3"
                        rating2="2.5"
                    />
                </Tab>
                <Tab eventKey="aujourd'hui" title="Aujourd'hui">
                    <TabItem
                        eventKey="0"
                        date="Live"
                        tourney="CS:GO - Esl League"
                        sprite="csgo"
                        team1="Astralis Team"
                        team2="Astralis Team"
                        rating1="1.3"
                        rating2="2.5"
                    />
                </Tab>
                <Tab eventKey="demain" title="Demain">
                    <TabItem
                        eventKey="0"
                        date="Live"
                        tourney="CS:GO - Esl League"
                        sprite="csgo"
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