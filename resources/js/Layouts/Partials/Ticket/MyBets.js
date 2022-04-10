import React from 'react'
import { Nav, Tab } from 'react-bootstrap'

import MyActiveBets from './MyActiveBets'

export default function MyBets({ tickets }) {
    return (
        <Tab.Container defaultActiveKey="active" className="position-relative">
            <Nav variant="pills" className="m-3">
                <Nav.Item className="flex-grow-1 text-center">
                    <Nav.Link eventKey="active">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item className="flex-grow-1 text-center">
                    <Nav.Link eventKey="paid">Réglé</Nav.Link>
                </Nav.Item>
            </Nav>
            <hr className="mb-0"/>
            <Tab.Content>
                <Tab.Pane eventKey="active">
                    <MyActiveBets tickets={tickets}/>
                </Tab.Pane>
                <Tab.Pane eventKey="paid">

                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    )
}
