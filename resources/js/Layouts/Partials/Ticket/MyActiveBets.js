import React from 'react'

function Bet({ bet, type }) {
    return (
        <>
            <span>
                <b>{bet.confrontation.teams[0].name} - {bet.confrontation.teams[1].name}</b>
            </span>
            <div className="d-flex justify-content-between">
                <span>Résulat du match</span>
                <span>{bet.team.name}</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Cote</span>
                <span>{bet.rating}</span>
            </div>
            {type === 'simple' ? (
                <>
                    <div className="d-flex justify-content-between">
                        <span>Mise</span>
                        <span>{bet.amount}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Gains</span>
                        <span>{(bet.rating * bet.amount).round(2)}</span>
                    </div>
                </>
            ) : null}
        </>
    )
}

function Ticket({ ticket }) {
    let totalRating = 0
    let totalAmount = 0

    const bets = ticket.active_bets.map((bet, i) => {
        totalRating += parseFloat(bet.rating)
        totalAmount += bet.amount

        return (
            <div key={i}>
                <Bet bet={bet} type={ticket.type}/>
                {i+1 !== ticket.active_bets.length ? <hr/> : null}
            </div>
        )
    })

    return (
        <div className="mb-3">
            <div className="card bg-dark rounded">
                <div
                    className="p-3 d-flex justify-content-between align-items-center"
                    data-linear-gradient={'primary'}
                >
                    <span className="text-light">N° {ticket.id}</span>
                    <span>{ticket.type}</span>
                </div>
                <div className="pt-3">
                    <div className="mx-3">{bets}</div>
                    <div className="py-2 mt-3" style={{ backgroundColor: '#2a2a2a'}}>
                        <div className="mx-3">
                            {ticket.type === 'combined'
                                ? <div className="d-flex justify-content-between align-items-center">
                                    <span>Cote totale</span>
                                    <span>{totalRating}</span>
                                </div>
                            : null}
                            <div className="d-flex justify-content-between align-items-center">
                                <span>Mise Totale</span>
                                <span>{totalAmount}</span>
                            </div>
                            {ticket.type === 'combined'
                                ? <div className="d-flex justify-content-between">
                                    <span>Nombre de selections</span>
                                    <span>{ticket.active_bets.length}</span>
                                </div>
                            : null}
                            <div className="d-flex justify-content-between">
                                <span>Gains possibles</span>
                                <span>{(totalRating * totalAmount).round(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function MyActiveBets({ tickets }) {
    return (
        <div className="overflow-auto p-3 pb-0" style={{ height: 'calc(100vh - 196px)' }}>
            {tickets ? tickets.map((ticket, i) => <Ticket key={i} ticket={ticket}/>) : null}
        </div>
    )
}
