import React from 'react'
import { Alert } from 'react-bootstrap'

export default function FlashStatus({ status, message }) {
    return status ? (
        <Alert variant={ status }>
            { message }
        </Alert>
    ) : null;
}
