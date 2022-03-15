import React from 'react';
import {Head, Link} from '@inertiajs/inertia-react';
import AppLayout from '@/Layouts/AppLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Home(props) {
    return (
        <AppLayout {...props}>
            <Head title="Accueil" />

            <div className="px-4 py-5 my-5 text-center">
                <Link className="text-center d-block" href="/">
                    <ApplicationLogo height="80" className="mb-4"/>
                </Link>
                <h1 className="display-5 fw-bold">RiBet</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis fuga illo non perspiciatis voluptas! Accusamus animi atque consequatur, cum deleniti distinctio ea eligendi excepturi facilis nesciunt non nostrum, quod vitae.
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Voir les tournois</button>
                        <button type="button" className="btn btn-outline-primary btn-lg px-4">Nous-contactez</button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
