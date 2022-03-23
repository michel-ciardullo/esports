import React from 'react';
import LiveNow from './LiveNow';

export default function LiveNowList({ livesNow }) {
    return (
        <>
            <div className="card">
                <div className="card-header border-bottom border-primary">
                    <h2 className="h3 mb-0">Live now</h2>
                </div>
                <div className="d-flex nav-scroller" style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}>
                    {livesNow.map((liveNow, i) => <LiveNow key={i} livesNow={liveNow} />)}
                </div>
            </div>
        </>
    )
}
