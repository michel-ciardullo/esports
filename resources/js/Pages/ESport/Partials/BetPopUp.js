import React, { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap';

export default function BetPopUp(props) {


    return  (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Placer un paris
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Parier sur{props.team}</h4>
                <p>la cote de l'equipe {props.team} est {props.rating}</p>
                {props.user ? <p>vous avez {props.user.wallet.balance}$</p> : <h4>connectez-vous pour pouvoir parier</h4> }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
