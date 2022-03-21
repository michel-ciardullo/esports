import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import { Container } from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';

export default function About(props) {

    return (
        <AppLayout {...props}>
            <Head title="À propos" />

            <Container className="mt-4">

                <h1 className="mb-0">À propos</h1>
                <br></br>
                <br></br>
                <h1 className="mb-0">Qui somme nous ?</h1>
                <hr className="my-4"/>
                <p>Nous avons concus cette application lors de notre projet de fin d'année d'étude a l'école RI7, puis nous avons finalement décidé de la mettre
                    <br></br>
                    en ligne et de devenir riche. Après tout comme vous, nous adorons l'argent, en parlant d'argent...
                </p>
                <br></br>
                <br></br>
                <h1 className="mb-0">Quel est le concept ?</h1>
                <hr className="my-4"/>
                <p>
                    RiBet est un site de paris en ligne permettant de parier sur vos jeux compétitifs préférer en temps réel !
                    <br></br>
                    Vous retrouverez sur notre plateforme les plus grands jeux E-Sport du monde tel que :
                    <br></br>
                    - Counter-Strike Global Offensive
                    <br></br>
                    - League of legends
                    <br></br>
                    - Dota 2
                    <br></br>
                    - Valorant
                    <br></br>
                    - Starcraft 2
                    <br></br>
                    Et d'autres a venir !
                </p>
                <br></br>
                <br></br>
                <h1 className="mb-0">Comment fonctionne les paris ?</h1>
                <hr className="my-4"/>
                <p>
                    Pour parier sur RiBet, vous devrez utiliser les RiCoins, une monnaie virtuelle que vous pourrez acquèrir en déposant de l'argent sur l'application.
                    <br></br>
                    Plusieurs packs sont disponibles. Vous pouvez ensuite utiliser vos crédits sur les différents matchs disponibles. Vos côtes de matchs seront automatiquement
                    <br></br>
                    sauvegardées et vérouillées une fois le paris effectué dans un ticket de pari. Selon le résultat du Match, vos crédits seront ajoutés directement sur votre compte.
                    <br></br>
                    Vous pourrez ensuite retirer vos crédits sur votre compte en banque.
                    <br></br>
                    Pour les virements d'argent nous acceptons les cartes banquaires et Paypal.
                </p>
            </Container>
        </AppLayout>
    );
}
