import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import { Container, Tab, Row, Col, Badge, ListGroup } from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';

// Partials wallet
import WalletTransactions from '@/Pages/Wallet/Partials/WalletTransactions';
import WalletDeposit from '@/Pages/Wallet/Partials/WalletDeposit';
import WalletWithdrawal from '@/Pages/Wallet/Partials/WalletWithdrawal';
import FlashStatus from "@/Components/FlashStatus";

function TabListGroup() {
    return (
        <ListGroup>
            <ListGroup.Item action href="#transactions" className="text-light">
                Opérations
            </ListGroup.Item>
            <ListGroup.Item action href="#deposit" className="text-light">
                Déposer
            </ListGroup.Item>
            <ListGroup.Item action href="#withdrawal" className="text-light">
                Retirer
            </ListGroup.Item>
        </ListGroup>
    )
}

function TabContent({ wallet, transactions }) {
    return (
        <Tab.Content>
            <Tab.Pane eventKey="#transactions">
                <WalletTransactions transactions={transactions} />
            </Tab.Pane>
            <Tab.Pane eventKey="#deposit">
                <WalletDeposit />
            </Tab.Pane>
            <Tab.Pane eventKey="#withdrawal">
                <WalletWithdrawal wallet={wallet}/>
            </Tab.Pane>
        </Tab.Content>
    )
}

export default function ProfileIndex(props) {

    return (
        <AppLayout {...props}>
            <Head title="Portefeuille" />

            <Container className="margin-children">

                <h1 className="mb-0">Portefeuille</h1>
                <hr className="my-4"/>

                <FlashStatus {...props.flash}/>

                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#transactions">
                    <Row>
                        <Col sm={4}>
                            <TabListGroup />
                        </Col>
                        <Col sm={8}>
                            <TabContent wallet={props.auth.user.wallet} transactions={props.transactions}/>
                        </Col>
                    </Row>
                </Tab.Container>

            </Container>
        </AppLayout>
    );
}
