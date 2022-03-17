import React from 'react';

export default function ProfileSection({ title, description, children }) {
    return (
        <div className="row profileSection">
            <div className="col-lg-4 mb-2 mb-lg-0">
                <h2 className="h3">{ title }</h2>
                <p>{ description }</p>
            </div>
            <div className="col-lg-8">
                <div className="card card-body shadow profileCard">
                    { children }
                </div>
            </div>
        </div>
    );
}
