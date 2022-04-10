import React, { useEffect, useState } from 'react'
import { Link, useForm } from '@inertiajs/inertia-react'
import { Form } from 'react-bootstrap'

export default function BettingCouponCombined({ items }) {
    const { post, errors, data, setData, processing } = useForm({
        type: 'combined',
        amount: items.length ? 1 : 0
    })

    const onHandleChange = event => {
        setData(event.target.name, event.target.value)
    }

    const submit = e => {
        e.preventDefault()
        post(route('tickets.store'))
    }

    let totalRating = 0
    items.forEach(item => totalRating += item.rating)

    return (
        <form
            onSubmit={submit}
            className="needs-validation"
            noValidate
        >
            <div className="overflow-auto px-3 pt-3" style={{ height: 'calc(100vh - 422px)' }}>
                {items ? items.map((item, i) =>
                    <div className="mb-3" key={i}>
                        <div className="card bg-dark rounded">
                            <div className="p-3 mb-3" data-linear-gradient={item.header}>
                                <Link className="text-light" href={item.link}>
                                    <span>{item.title}</span>
                                </Link>
                            </div>
                            <div className="mx-3 mb-3">
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Résultat du match</span>
                                    <span>{item.result}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Cote</span>
                                    <span>{item.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="position-absolute bottom-0 start-0 end-0">
                <div className="bg-dark border-top border-primary p-3">
                    <div className="mb-3">
                        <Form.FloatingLabel
                            controlId="amount"
                            label="Montant"
                            className="mb-3"
                        >
                            <Form.Control
                                type="number"
                                name="amount"
                                value={data.amount}
                                onChange={onHandleChange}
                                placeholder="0"
                                isInvalid={'amount' in errors}
                                required
                            />
                            <Form.Control.Feedback type="invalid" children={errors.amount} />
                        </Form.FloatingLabel>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Cote Globale</span>
                        <span>{totalRating}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Gain estimé</span>
                        <span>{totalRating * data.amount}</span>
                    </div>
                    <button
                        disabled={processing}
                        className="btn btn-outline-primary w-100"
                        type="submit"
                    >
                        Placer un pari Combiné
                    </button>
                </div>
            </div>
        </form>
    )
}
