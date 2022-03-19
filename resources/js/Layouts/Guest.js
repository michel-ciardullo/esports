import React from 'react';
import { Link } from '@inertiajs/inertia-react';

import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Guest({ title, children }) {
    return (
        <main className="guest">
            <div className="guest-content">
                <Link className="text-center d-block" href="/">
                    <ApplicationLogo width="200" height="200" className="mb-4" />
                </Link>
                <div className="card card-body">
                    <h1>{ title }</h1>
                    {children}
                    <div className="text-center">
                        <p className="mt-3 mb-1 text-white">© 2021–2022</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
