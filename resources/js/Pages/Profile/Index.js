import React from 'react';
import {Head} from '@inertiajs/inertia-react';
import AppLayout from '@/Layouts/AppLayout';
import {Container} from "react-bootstrap";

export default function Home(props) {
    return (
        <AppLayout {...props}>
            <Head title="Profile" />

            <Container className="mt-4">

                <h1 className="mb-0">Profile page</h1>
                <hr className="my-4"/>

                <div className="row">
                    <div className="col-lg-4 mb-2 mb-lg-0">
                        Description
                    </div>
                    <div className="col-lg-8">
                        <div className="card card-body">
                            a
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-lg-4 mb-2 mb-lg-0">
                        Description
                    </div>
                    <div className="col-lg-8">
                        <div className="card card-body">
                            a
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-lg-4 mb-2 mb-lg-0">
                        Description
                    </div>
                    <div className="col-lg-8">
                        <div className="card card-body border-danger">
                            Supprimer le compte
                        </div>
                    </div>
                </div>
            </Container>
        </AppLayout>
    );
}
