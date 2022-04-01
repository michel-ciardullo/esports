import React from 'react';
import {Accordion, Button} from "react-bootstrap";
import {useForm} from "@inertiajs/inertia-react";

export default function QnA({admin, data}) {
    const { setData, delete: destroy } = useForm();

    const submit = e => {
        e.preventDefault();
        setData('password_confirmed_at', 1647348179)
        destroy(route('faq.destroy', data.id));
    };

    return (
        <Accordion.Item eventKey={data.id} className="mb-3">
            <Accordion.Header>{data.question}</Accordion.Header>
            <Accordion.Body>
                {data.answer}
                {admin ?
                    <form
                        onSubmit={submit}
                        className="needs-validation mt-3"
                        noValidate
                    >
                        <Button variant="danger" type="submit">
                            Supprimer le QnA
                        </Button>
                    </form> : null}
            </Accordion.Body>
        </Accordion.Item>
    )
}
