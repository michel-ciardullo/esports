import React from 'react'

function Bet({ bet, type }) {
    return (
        <>
            <span>
                {bet.confrontation.teams[0].name} - {bet.confrontation.teams[1].name}
            </span>
            <div>
                <span>Résulat du match : {bet.team.name}</span>
            </div>
            {type === 'combined' ? (
                <>
                    <div className="d-flex justify-content-between">
                        <span>Cote</span>
                        <span>{bet.rating}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Mise</span>
                        <span>{bet.amount} RiCoin</span>
                    </div>
                </>
            ) : null}
        </>
    )
}

function Ticket({ ticket }) {
    let totalRating = 0
    let totalAmount = 0

    const bets = ticket.bets.map((bet, i) => {
        totalRating += parseFloat(bet.rating)
        totalAmount += bet.amount

        return (
            <div key={i}>
                <Bet bet={bet} type={ticket.type}/>
                {i+1 !== ticket.bets.length ? <hr/> : null}
            </div>
        )
    })

    return (
        <div className="mb-3">
            <div className="card bg-dark rounded">
                <div
                    className="p-3 d-flex justify-content-between align-items-center"
                    data-linear-gradient={'counter-strike'}
                >
                    <span className="text-light">N° {ticket.id}</span>
                    <span>{ticket.type}</span>
                </div>
                <div className="pt-3">
                    <div className="mx-3">{bets}</div>
                    <div className="py-2 mt-3" style={{ backgroundColor: '#2a2a2a'}}>
                        <div className="mx-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <span>Cote total</span>
                                <span>{totalRating}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <span>Mise jouée</span>
                                <span>{totalAmount} RiCoin</span>
                            </div>
                        </div>
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
