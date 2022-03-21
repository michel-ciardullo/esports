import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Button, Form } from 'react-bootstrap';

export default function WalletWithdrawal({ wallet }) {
    const { data, setData, post, errors, reset } = useForm({
        amount: '',
    });

    const onHandleChange = event => {
        setData(event.target.name, event.target.value);
    };

    const submit = e => {
        e.preventDefault();
        post(route('wallet.withdrawal'), {
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
                    max={wallet.balance}
                />
                <Form.Control.Feedback type="invalid" children={errors.amount} />
            </Form.FloatingLabel>

            <div>
                <Button variant="primary" type="submit">Retirer</Button>
            </div>
        </form>
    );
}
