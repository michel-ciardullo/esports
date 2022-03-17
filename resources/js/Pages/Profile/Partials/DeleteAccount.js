import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Button } from 'react-bootstrap';

import ProfileSection from '@/Pages/Profile/Partials/ProfileSection';

export default function DeleteAccount({ auth }) {
    const { setData, delete: destroy } = useForm();

    const submit = e => {
        e.preventDefault();
        setData('password_confirmed_at', 1647348179)
        destroy(route('profile.delete'));
    };

    return (
        <ProfileSection
            title="Supprimer le compte"
            description="Supprimer définitivement votre compte."
        >
            <p className="mb-0 text-sm text-gray deleteAccount">
                Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées.
                Avant de supprimer votre compte, veuillez télécharger toutes les données ou informations que vous
                souhaitez conserver.
            </p>
            <form
                onSubmit={submit}
                className="needs-validation mt-3"
                noValidate
            >
                <Button variant="danger" type="submit">
                    Supprimer le compte
                </Button>
            </form>
        </ProfileSection>
    );
}
