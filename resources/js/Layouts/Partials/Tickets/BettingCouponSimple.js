import React from 'react'
import { Link, useForm } from '@inertiajs/inertia-react'
import { Form } from 'react-bootstrap'

export default function BettingCouponSimple({ tickets }) {
    const { post: store, data, setData, errors, processing } = useForm({
        type: 'simple',
        amounts: tickets.map(() => 0)
    })
    const { post: remove } = useForm()

    const onHandleChange = event => {
        const amounts = [...data.amounts]
        amounts[event.target.name] = parseInt(event.target.value)
        setData('amounts', amounts)
    }

    const submit = event => {
        event.preventDefault()
        store(route('tickets.store'), { preserveScroll: true })
    }

    const onClick = (event, i) => {
        event.preventDefault()
        remove(route('tickets.remove', [i]), { preserveScroll: true })
    }

    return (
        <form
            onSubmit={submit}
            className="needs-validation"
            noValidate
        >
            <div
                className="overflow-auto px-3 pt-3"
                style={{ height: 'calc(100vh - 346px)' }}
            >
                {tickets ? tickets.map((ticket, i) =>
                    <div className="mb-3" key={i}>
                        <div className="card bg-dark rounded" style={{ clipPath: 'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 0 100%)'}}>
                            <div className="d-flex align-items-center justify-content-between p-3 mb-3" data-linear-gradient={'counter-strike'}>
                                <Link className="text-light" href={ticket.confrontation.link}>
                                    <span>{ticket.title}</span>
                                </Link>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={e => onClick(e, i)}
                                />
                            </div>
                            <div className="mx-3">
                                <div className="mb-3">
                                    {ticket.tournament.name}
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>{ticket.team.name}</span>
                                    <span>{ticket.team.rating}</span>
                                </div>
                            </div>
                            <div className="p-3">
                                <Form.FloatingLabel
                                    controlId={i}
                                    label="Montant"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="number"
                                        name={i}
                                        value={data.amounts[i]}
                                        onChange={onHandleChange}
                                        isInvalid={`amounts.${i}` in errors}
                                        placeholder="0"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid" children={errors[`amounts.${i}`]} />
                                </Form.FloatingLabel>
                                <div className="d-flex justify-content-between">
                                    <span>Gain estimé</span>
                                    <span>0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="position-absolute bottom-0 start-0 end-0">
                <div className="bg-dark border-top border-primary p-3">
                    <div className="d-flex justify-content-between mb-3">
                        <span>Mise total</span>
                        <span>0</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Gain estimé</span>
                        <span>0</span>
                    </div>
                    <button
                        disabled={processing}
                        className="btn btn-outline-primary w-100"
                        type="submit"
                    >
                        Placer un pari simple
                    </button>
                </div>
            </div>
        </form>
    )
}
