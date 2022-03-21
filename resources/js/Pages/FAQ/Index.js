import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import { Container, Accordion } from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';

export default function FAQIndex(props) {

    return (
        <AppLayout {...props}>
            <Head title="FAQ" />

            <Container className="mt-4">

                <h1 className="mb-0">FAQ</h1>
                <hr className="my-4"/>

                <Accordion defaultActiveKey="13">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Est ce que le site est sécurisé ?</Accordion.Header>
                        <Accordion.Body>
                        Non ? Oui evidemment, le site est de confiance est votre argent est en sécurité, vous pouvez être sur
                        que vous aurez votre argent.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Comment obtenir des crédits ?</Accordion.Header>
                        <Accordion.Body>
                        Vous devez déposer de l'argent sur votre compte grâce aux différents packs de crédits RiCoin en utilisant votre
                        compte en banque (encore une fois votre argent est en scéurité, ou pas...)
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Avec quoi puis-je payer des RiCoins ?</Accordion.Header>
                        <Accordion.Body>
                        Nous acceptons les virements par Paypal, Mastercard, Visa
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Est il possible de visionner les matchs en ligne ?</Accordion.Header>
                        <Accordion.Body>
                        Malheureusement nous ne pouvons pas actuellement permettre la retransmission des matchs, mais celà
                        arrivera lors d'une prochaine mise a jour
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>J'ai un problème avec mon compte que faire ?</Accordion.Header>
                        <Accordion.Body>
                        Vous pouvez contacter notre service client ici, disponible du lundi au vendredi de 10h a 22h
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </Container>
        </AppLayout>
    );
}
