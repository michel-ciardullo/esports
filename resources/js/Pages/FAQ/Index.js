import React from 'react';
import { Head, Link } from '@inertiajs/inertia-react'
import { Container, Accordion, Breadcrumb } from 'react-bootstrap'

import AppLayout from '@/Layouts/AppLayout'
import QnA from "@/Pages/FAQ/Partials/QnA";
import QuestionsForm from "@/Pages/FAQ/Partials/QuestionsForm";
import FlashStatus from "@/Components/FlashStatus";

export default function FAQIndex(props) {

    return (
        <AppLayout auth={props.auth}>
            <Head title="FAQ" />

            <Container className="margin-children">

                <FlashStatus {...props.flash}/>

                <Breadcrumb>
                    <li className="breadcrumb-item">
                        <Link href={route('home')} role="button">Accueil</Link>
                    </li>
                    <Breadcrumb.Item active>FAQ</Breadcrumb.Item>
                </Breadcrumb>
                <hr className="my-4"/>

                <Accordion defaultActiveKey="1">
                    {props.faq.map((data,i)=>
                        <QnA key={i} data={data}/>
                    )}
                </Accordion>

                <QuestionsForm />

            </Container>
        </AppLayout>
    )
}
