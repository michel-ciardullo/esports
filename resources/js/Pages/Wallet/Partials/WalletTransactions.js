import React from 'react';
import { Badge, ListGroup } from 'react-bootstrap';

function Transaction({ transaction }) {
    const positifValue = transaction.type === 'deposit' || transaction.type === 'gain'

    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start text-light"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{transaction.type}</div>
                <em>{new Date(transaction.created_at).toLocaleString()}</em>
            </div>
            <Badge bg={positifValue ? 'success' : 'danger'} pill>
                {positifValue ? '+' : '-'}{transaction.amount}€
            </Badge>
        </ListGroup.Item>
    )
}

export default function WalletTransactions({ transactions }) {
    return (
        <ListGroup as="ul">
            {transactions.map((transaction, i) =>
                <Transaction key={i} transaction={transaction}/>
            )}
        </ListGroup>
    );
}
