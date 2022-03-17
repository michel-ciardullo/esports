import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from '@inertiajs/inertia-react';

export default function WalletDeposit() {
    const { data, setData, post, errors, reset } = useForm({
        amount: '',
    });

    const onHandleChange = event => {
        setData(event.target.name, event.target.value);
    };

    const submit = e => {
        e.preventDefault();
        post(route('wallet.deposit'), {
            onFinish: function () {
                reset('amount')
            }
        });
    };

    return (
        <form
            onSubmit={submit}
            className="card card-body needs-validation"
            noValidate
        >

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
                    isInvalid={'amount' in errors}
                    placeholder="Montant"
                    required
                    min={1}
                />
                <Form.Control.Feedback type="invalid" children={errors.amount} />
            </Form.FloatingLabel>

            <div>
                <Button variant="outline-primary" type="submit">Déposer</Button>
            </div>
        </form>
    );
}
