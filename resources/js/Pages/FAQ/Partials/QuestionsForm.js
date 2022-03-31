import React from 'react'
import { useForm } from '@inertiajs/inertia-react'
import { Form, Button } from 'react-bootstrap'

export default function QuestionsForm(props) {
    const { post, errors, data, setData, reset } = useForm({
        question: '',
        answer: ''
    })

    const onHandleChange = event => {
        setData(event.target.name, event.target.value)
    }

    const submit = e => {
        e.preventDefault()
        post(route('faq.store'), {
            onFinish: reset
        })
    }

    return (
                <Form
                    className="card card-body shadow needs-validation mt-4"
                    onSubmit={submit}
                    noValidate
                >
                    <Form.FloatingLabel
                        controlId="question"
                        label="Question"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            name="question"
                            value={data.question}
                            onChange={onHandleChange}
                            placeholder="Question"
                            isInvalid={'question' in errors}
                            required
                        />
                        <Form.Control.Feedback type="invalid" children={errors.question} />
                    </Form.FloatingLabel>

                    <Form.FloatingLabel
                        controlId="answer"
                        label="Reponse"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            name="answer"
                            value={data.answer}
                            onChange={onHandleChange}
                            placeholder="Reponse"
                            isInvalid={'answer' in errors}
                            required
                        />
                        <Form.Control.Feedback type="invalid" children={errors.answer} />
                    </Form.FloatingLabel>

                    <div>
                        <Button variant="primary" type="submit">
                            Envoyer
                        </Button>
                    </div>

                </Form>
    )
}
