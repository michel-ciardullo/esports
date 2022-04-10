import React from 'react'
import { Nav, Tab } from 'react-bootstrap'

import BettingCouponSimple from './BettingCouponSimple'
import BettingCouponCombined from './BettingCouponCombined'

export default function BettingCouponSimpleAndCombined({ ticket }) {
    return (
        <Tab.Container defaultActiveKey="simple" className="position-relative">
            <Nav variant="pills" className="m-3">
                <Nav.Item className="flex-grow-1 text-center">
                    <Nav.Link eventKey="simple">Simple</Nav.Link>
                </Nav.Item>
                <Nav.Item className="flex-grow-1 text-center">
                    <Nav.Link eventKey="combined">Combiné</Nav.Link>
                </Nav.Item>
            </Nav>
            <hr className="mb-0"/>
            <Tab.Content>
                <Tab.Pane eventKey="simple">
                    <BettingCouponSimple items={ticket}/>
                </Tab.Pane>
                <Tab.Pane eventKey="combined">
                    <BettingCouponCombined items={ticket}/>
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    )
}
