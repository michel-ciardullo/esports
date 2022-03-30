import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {useForm} from "@inertiajs/inertia-react";


function BetForm (props) {
    // const { post, errors, data, setData } = useForm({
    //     bet: ''
    // });
    //
    // const onHandleChange = event => {
    //     setData(event.target.name, event.target.value);
    // };
    //
    // const onHandleChangeCheck = event => {
    //     setData(event.target.name, event.target.value === 'on' ? 'off' : 'on');
    // };
    //
    // const submit = e => {
    //     e.preventDefault();
    //     post(route('ESport'));
    // };

    return (
        <>
            <div className="d-flex flex-row justify-content-between mb-2 px-2">
                <span>{props.team}</span>
                <span className="text-primary">{props.rating}</span>
            </div>
            <form
                // onSubmit={submit}
                className="needs-validation"
                noValidate
            >
                <Form.FloatingLabel
                    controlId="bet"
                    label="€"
                    className="mb-3"
                >
                    <Form.Control
                        type="bet"
                        name="bet"
                        // value='a'
                        // onChange={onHandleChange}
                        placeholder="100"
                        isInvalid='a'
                        required
                    />
                    <Form.Control.Feedback type="invalid" children='ez' />
                </Form.FloatingLabel>
            </form>
        </>
    )
}

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
                {props.user ?
                    <BetForm
                        rating={props.rating}
                        team={props.team}
                        balance={props.user.wallet.balance}
                    />
                    : <h4>connectez-vous pour pouvoir parier</h4> }
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" onClick={props.onHide}>Placer le paris</Button>
            </Modal.Footer>
        </Modal>
    )
}
