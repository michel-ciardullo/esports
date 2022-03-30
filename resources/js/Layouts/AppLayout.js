import React, { useState } from 'react'
import { Nav, Modal, Tab, Button } from 'react-bootstrap'

import { GlobalContext, modalTickets } from '@/context'
import Navbar from './Partials/Navbar'
import OffCanvas from "@/Layouts/Partials/OffCanvas";

export default function AppLayout({ auth, children }) {
    // State also contains the updater function so it will
    // be passed down into the context provider

    // State also contains the updater function so it will
    // be passed down into the context provider
    const [state, setState] = useState({
        modalTickets
    })

    const handleShow = modalTickets => {
        console.log(modalTickets)

        setState({
            modalTickets: {
                ...modalTickets,
                show: true
            },
        })
    }

    const handleClose = () => {
        setState({
            modalTickets: { show: false },
        })
    }

    return (
        <GlobalContext.Provider value={{...state, handleShow}}>
            <Navbar auth={auth}/>

            <main className="pb-3">
                {children}
            </main>

            <OffCanvas placement="end" name='name' />

            <Modal show={state.modalTickets.show} onHide={handleClose} className="text-dark" centered>

                <Modal.Header className="border-bottom border-primary" closeButton>
                    <Modal.Title>Ticket de paris ({state.modalTickets.name}}</Modal.Title>
                </Modal.Header>

                <Tab.Container defaultActiveKey="simple">

                    <Nav variant="sub" className="border-bottom border-primary">
                        <Nav.Item>
                            <Nav.Link eventKey="simple" className="d-flex flex-column p-0">
                                <span className="p-3">Simple</span>
                                <span />
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="combined" className="d-flex flex-column p-0">
                                <span className="p-3">Combiné</span>
                                <span />
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Modal.Body>
                        <Tab.Content>
                            <Tab.Pane eventKey="simple">
                                Simple
                            </Tab.Pane>
                            <Tab.Pane eventKey="combined">
                                Combiné
                            </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>

                </Tab.Container>

                <Modal.Footer className="border-top border-primary">
                    <Button variant="light" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="outline-primary">
                        Jouer
                    </Button>
                </Modal.Footer>
            </Modal>

        </GlobalContext.Provider>
    )
}
