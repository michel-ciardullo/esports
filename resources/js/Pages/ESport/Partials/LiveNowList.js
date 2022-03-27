import React from 'react'
import { Badge, Tab, Nav } from 'react-bootstrap'
import Game from './Game'

function LiveNowNavLink({ eventKey, slug, label, count }) {
    return (
        <Nav.Item className={`card-${slug}`}>
            <Nav.Link eventKey={eventKey} className="d-block position-relative text-center px-3 pt-3 pb-2 game-icon">
                <Badge style={{ top: '.5rem', right: '.5rem' }} className="position-absolute" variant="success">
                    {count}
                </Badge>
                <svg width="100" height="100">
                    <use xlinkHref={`/img/sprite.svg#${slug}`}/>
                </svg>
                <span className="d-block mt-2">{label}</span>
            </Nav.Link>
        </Nav.Item>
    )
}

function LiveNowTabPane({ eventKey, children }) {
    return (
        <Tab.Pane eventKey={eventKey}>
            {children}
        </Tab.Pane>
    )
}

export default function LiveNowList({ lives }) {
    const links = lives.map((live, i) =>
        <LiveNowNavLink
            key={i}
            eventKey={i}
            label={live.name}
            slug={live.slug}
            count={live.live_count}
        />
    )

    const panes = lives.map((live, i) =>
        <LiveNowTabPane key={i} eventKey={i}>
            <Game game={live}/>
        </LiveNowTabPane>
    )

    const active = lives.length > 0 ? 0 : null

    return (
        <Tab.Container defaultActiveKey={active}>

            <div className="card mb-4">
                <div className="card-header border-bottom border-primary">
                    <h2 className="h3 mb-0">Live now</h2>
                </div>
                <div className="d-flex nav-scroller" style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}>
                    {links}
                </div>
            </div>

            <div className="card mb-4">
                <Tab.Content>{panes}</Tab.Content>
            </div>

        </Tab.Container>
    )
}
