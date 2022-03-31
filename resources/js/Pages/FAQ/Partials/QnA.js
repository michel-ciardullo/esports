import React from 'react';
import {Accordion} from "react-bootstrap";

export default function QnA({data}) {

    return (
        <Accordion.Item eventKey={data.id} className="mb-3">
            <Accordion.Header>{data.question}</Accordion.Header>
            <Accordion.Body>
                {data.answer}
            </Accordion.Body>
        </Accordion.Item>
    )
}
