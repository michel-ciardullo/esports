import React from 'react'
import { Button, Modal, Nav, Offcanvas as BOffcanvas, Tab } from 'react-bootstrap'

import OffCanvasIcon from './OffCanvasIcon'
import BettingCouponSimpleAndCombined from './BettingCouponSimpleAndCombined'
import MyBets from '@/Layouts/Partials/Ticket/MyBets'

export default function OffCanvas({ show, handleShow, onHide, ticket, tickets }) {
    return (
        <>
            <Button
                className="position-fixed bottom-0 end-0 mb-5 me-5"
                variant="outline-primary"
                onClick={handleShow}
            >
                <OffCanvasIcon />
            </Button>
            <BOffcanvas
                placement="end"
                className="bg-dark-100"
                show={show}
                onHide={onHide}
            >
                <BOffcanvas.Header closeButton>
                    <BOffcanvas.Title>Ticket de paris</BOffcanvas.Title>
                </BOffcanvas.Header>
                <Tab.Container defaultActiveKey="betting-coupon">

                    <Nav variant="sub" className="border-bottom border-primary">
                        <Nav.Item>
                            <Nav.Link eventKey="betting-coupon" className="d-flex flex-column p-0">
                                <span className="p-3">Coupon de pari</span>
                                <span />
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="my-bets" className="d-flex flex-column p-0">
                                <span className="p-3">Mes paris</span>
                                <span />
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Modal.Body className="p-0">
                        <Tab.Content>
                            <Tab.Pane eventKey="betting-coupon">
                                <BettingCouponSimpleAndCombined ticket={ticket}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="my-bets">
                                <MyBets tickets={tickets}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>

                </Tab.Container>
            </BOffcanvas>
        </>
    )
}
