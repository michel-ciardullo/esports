import React from 'react';
import { Link } from '@inertiajs/inertia-react';

import ApplicationLogoLong from '@/Components/ApplicationLogoLong';

export default function Guest({ title, children }) {
    return (
        <main className="vh-100 guest">
            <div className="guest-content">
                <div className="card card-body rounded">
                    <Link className="text-center d-block" href="/">
                        <ApplicationLogoLong className="mb-2" />
                    </Link>
                    <h1 className="text-center mb-4">{ title }</h1>
                    <hr className="mw-100 mb-5"></hr>
                    {children}
                    <div className="text-center">
                        <p className="mt-3 mb-1 text-white">© 2021–2022</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
