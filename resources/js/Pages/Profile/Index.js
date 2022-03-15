import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import { Container } from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';
import UpdateInformations from '@/Pages/Profile/Partials/UpdateInformations';
import FlashStatus from '@/Components/FlashStatus';
import UpdateSecurity from '@/Pages/Profile/Partials/UpdateSecurity';
import DeleteAccount from "@/Pages/Profile/Partials/DeleteAccount";

export default function ProfileIndex(props) {

    return (
        <AppLayout {...props}>
            <Head title="Profile" />

            <Container className="mt-4">

                <h1 className="mb-0">Profile page</h1>
                <hr className="my-4"/>

                <FlashStatus {...props.flash}/>

                <UpdateInformations user={props.auth.user}/>
                <hr/>

                <UpdateSecurity />
                <hr/>

                <DeleteAccount />

            </Container>
        </AppLayout>
    );
}
