import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
import {Link} from '@inertiajs/inertia-react';
import Sprites from "@/Components/Sprites";
import NavLink from "@/Components/NavLink";

function CardWrapper ({imgUrl}) {
    return (
        <div className="d-flex px-4 py-5 card-wrapper mb-4" style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../img/${imgUrl})`,
            backgroundSize: 'cover',
            borderRadius: '10px 10px 0 0'
        }}>
            <h2>Counter-Strike</h2>
            <div>
                <NavLink label="En cours" name="encours"/>
                <NavLink label="Aujourd'hui" name="aujourdhui"/>
                <NavLink label="Demain" name="demain"/>
            </div>
        </div>
    )
}

export default function GameShowMatches () {

    return (
        <div className="game-show-matches">
            <CardWrapper imgUrl="csgowallpaper1.jpg"/>
            <Accordion defaultActiveKey={["0","1","2","3","4","5","6","7","8","9"]} alwaysOpen>
                    <Accordion.Item className="accordion-item-e-sport mb-3 shadow" eventKey="0">
                        <Accordion.Header>
                            <Sprites height="20px" width="20px" sprite='csgo' fill='gray' className="me-2" />
                            CS:GO - ESL Pro League
                        </Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className="accordion-item-e-sport mb-3 shadow" eventKey="1">
                        <Accordion.Header>
                            <Sprites height="20px" width="20px" sprite='csgo' fill='gray' className="me-2" />
                            CS:GO - ESL Pro League
                        </Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet
                        </Accordion.Body>
                    </Accordion.Item>  
                </Accordion>

        </div>
    )
}