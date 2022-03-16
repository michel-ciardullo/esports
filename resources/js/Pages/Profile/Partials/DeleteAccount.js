import React from 'react';
import { Button } from 'react-bootstrap';

import ProfileSection from '@/Pages/Profile/Partials/ProfileSection';

export default function DeleteAccount() {
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
            <form className="mt-3" action="#">
                <Button variant="danger">Supprimer le compte</Button>
            </form>
        </ProfileSection>
    );
}
