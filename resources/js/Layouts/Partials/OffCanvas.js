import React, { useState } from 'react'
import {Button, Offcanvas as BOffcanvas } from 'react-bootstrap'

export default function OffCanvas({ name, ...props }) {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="me-2">
                {name}
            </Button>
            <BOffcanvas show={show} onHide={handleClose} {...props}>
                <BOffcanvas.Header closeButton>
                    <BOffcanvas.Title>Offcanvas</BOffcanvas.Title>
                </BOffcanvas.Header>
                <BOffcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </BOffcanvas.Body>
            </BOffcanvas>
        </>
    );
}
