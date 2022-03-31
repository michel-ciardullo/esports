import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react'
import { Breadcrumb, Container } from 'react-bootstrap'

import AppLayout from '@/Layouts/AppLayout'

export default function About(props) {

    return (
        <AppLayout {...props}>
            <Head title="À propos" />

            <Container className="margin-children">

                <Breadcrumb>
                    <li className="breadcrumb-item">
                        <Link href={route('home')} role="button">Accueil</Link>
                    </li>
                    <Breadcrumb.Item active>À propos</Breadcrumb.Item>
                </Breadcrumb>
                <hr className="my-4" />

                <article>
                    <h2>Qui somme nous ?</h2>
                    <p>
                        Nous avons concus cette application lors de notre projet de fin d'année d'étude a l'école RI7, puis nous avons finalement décidé de la mettre
                        en ligne et de devenir riche. Après tout comme vous, nous adorons l'argent, en parlant d'argent...
                    </p>
                </article>

                <article>
                    <h1>Quel est le concept ?</h1>
                    <p>
                        RiBet est un site de paris en ligne permettant de parier sur vos jeux compétitifs préférer en temps réel !
                    </p>
                    <p>
                        Vous retrouverez sur notre plateforme les plus grands jeux E-Sport du monde tel que :
                    </p>
                    <ul>
                        <li>Counter-Strike Global Offensive</li>
                        <li>League of legends</li>
                        <li>Dota 2</li>
                        <li>Valorant</li>
                        <li>Starcraft 2</li>
                    </ul>
                    <p>
                        Et d'autres a venir !
                    </p>
                </article>

                <article>
                    <h2>Comment fonctionne les paris ?</h2>
                    <p>
                        Pour parier sur RiBet, vous devrez utiliser les RiCoins, une monnaie virtuelle que vous pourrez acquèrir en déposant de l'argent sur l'application.
                    </p>
                    <p>
                        Plusieurs packs sont disponibles. Vous pouvez ensuite utiliser vos crédits sur les différents matchs disponibles. Vos côtes de matchs seront automatiquement
                    </p>
                    <p>
                        sauvegardées et vérouillées une fois le paris effectué dans un ticket de pari. Selon le résultat du Match, vos crédits seront ajoutés directement sur votre compte.
                    </p>
                    <p>
                        Vous pourrez ensuite retirer vos crédits sur votre compte en banque.
                    </p>
                    <p>
                        Pour les virements d'argent nous acceptons les cartes banquaires et Paypal.
                    </p>
                </article>
            </Container>
        </AppLayout>
    );
}
