import React from 'react'

function Bet({ bet }) {
    return (
        <>
            <span className="d-block">{bet.confrontation.teams[0].name} - {bet.confrontation.teams[1].name}</span>
            <div>
                <span>Résulat du match : {bet.team.name}</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Cote</span>
                <span>{bet.rating}</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Mise</span>
                <span>{bet.amount} RiCoin</span>
            </div>
        </>
    )
}

function Ticket({ ticket }) {
    return (
        <div className="mb-3">
            <div className="card bg-dark rounded pb-3">
                <div
                    className="p-3 d-flex justify-content-between align-items-center"
                    data-linear-gradient={'counter-strike'}
                >
                    <span className="text-light">N° {ticket.id}</span>
                    <span>{ticket.type}</span>
                </div>
                <div className="mx-3 pt-3">
                    {ticket.bets.map((bet, i) => <Bet key={i} bet={bet}/>)}
                    <hr/>
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Cote total</span>
                        <span>{ticket.total_rating}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Mise jouée</span>
                        <span>{ticket.total_amount} RiCoin</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function MyBets({ tickets }) {
    return (
        <div className="overflow-auto p-3 pb-0" style={{ height: 'calc(100vh - 122px)' }}>
            {tickets ? tickets.map((ticket, i) => <Ticket key={i} ticket={ticket}/>) : null}
        </div>
    )
}
