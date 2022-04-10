import React, {useEffect, useState} from 'react'
import { Link, useForm } from '@inertiajs/inertia-react'
import { Form } from 'react-bootstrap'

export default function BettingCouponSimple({ items }) {
    const { post: store, data, setData, errors, processing } = useForm({
        type: 'simple',
        amounts: items.map(() => 1)
    })

    const { post: remove } = useForm()

    const [state, setState] = useState({
        totalAmount: 0,
        totalPossibleGains: 0,
    })

    const onHandleChange = event => {
        const i         = parseInt(event.target.name)
        const amount    = parseInt(event.target.value)

        setData('amounts', {
            ...data.amounts,
            [i]: amount
        })
    }

    const submit = event => {
        event.preventDefault()
        store(route('tickets.store'), { preserveScroll: true })
    }

    const destroy = (event, i) => {
        event.preventDefault()
        remove(route('ticket.destroy', [i]), { preserveScroll: true })
    }

    useEffect(() => {
        let totalAmount           = 0
        let totalPossibleGains    = 0

        items.forEach((item, i) => {
            const dataAmount    = data.amounts[i]
            totalAmount         += dataAmount
            totalPossibleGains  += (item.rating * dataAmount).round(2)
        })

        setState({ totalAmount, totalPossibleGains })

        return () => {}
    }, [data.amounts])

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
                {items ? items.map((item, i) =>
                    <div className="mb-3" key={i}>
                        <div className="card bg-dark rounded" style={{ clipPath: 'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 0 100%)'}}>
                            <div className="d-flex align-items-center justify-content-between p-3 mb-3" data-linear-gradient={item.header}>
                                <Link className="text-light" href={item.link}>
                                    <span>{item.title}</span>
                                </Link>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={e => destroy(e, i)}
                                />
                            </div>
                            <div className="mx-3">
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Résultat du match</span>
                                    <span>{item.result}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Cote</span>
                                    <span>{item.rating}</span>
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
                                        value={i in data.amounts ? data.amounts[i] : 1}
                                        onChange={onHandleChange}
                                        isInvalid={`amounts.${i}` in errors}
                                        placeholder="0"
                                        min={1}
                                        max={10}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid" children={errors[`amounts.${i}`]} />
                                </Form.FloatingLabel>
                                <div className="d-flex justify-content-between">
                                    <span>Gain estimé</span>
                                    <span>{item.rating * data.amounts[i]}</span>
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
                        <span>{state.totalAmount}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Gain estimé</span>
                        <span>{state.totalPossibleGains}</span>
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
