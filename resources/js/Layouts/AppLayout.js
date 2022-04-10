import React, { Component } from 'react'

import { GlobalContext } from '@/context'
import Navbar from './Partials/Navbar'
import OffCanvasTickets from '@/Layouts/Partials/Ticket/OffCanvas'

export default class AppLayout extends Component {

    state = {
        offcanvas: false
    }

    constructor(props) {
        super(props)

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    render() {
        const { auth, children } = this.props
        const { offcanvas } = this.state

        return (
            <GlobalContext.Provider value={{
                offcanvas,
                handleShow: this.handleShow
            }}>
                <Navbar auth={auth}/>

                <main className="pb-3">
                    {children}
                </main>

                {auth && auth.user
                    ? <OffCanvasTickets
                        tickets={auth.user.tickets}
                        ticket={auth.ticket}
                        show={offcanvas}
                        handleShow={this.handleShow}
                        onHide={this.handleClose}
                    />
                    : null
                }

            </GlobalContext.Provider>
        )
    }

    handleShow() {
        this.toggleOffcanvas(true)
    }

    handleClose() {
        this.toggleOffcanvas(false)
    }

    toggleOffcanvas(value) {
        this.setState({ offcanvas: value })
    }
}
