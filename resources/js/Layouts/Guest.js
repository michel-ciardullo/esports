import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Guest({ children }) {
    return (
        <main className="guest">
            <div className="guest-content">
                <Link className="text-center d-block" href="/">
                    <ApplicationLogo width="62" height="62" className="mb-4" />
                </Link>
                {children}
            </div>
        </main>
    );
}
