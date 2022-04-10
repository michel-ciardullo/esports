import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react'
import { Container, Breadcrumb } from 'react-bootstrap'

import AppLayout from '@/Layouts/AppLayout'

export default function ESportsConfrontation({ auth, esport }) {

    const tournamentName = (esport.tournaments.yesterday.length > 0 ? esport.tournaments.yesterday[0].name : null)
        || (esport.tournaments.now.length > 0 ? esport.tournaments.now[0].name : null)
        || (esport.tournaments.today.length > 0 ? esport.tournaments.today[0].name : null)
        || (esport.tournaments.tomorrow.length > 0 ? esport.tournaments.tomorrow[0].name : null)

    const hasLive = esport.tournaments.now.length
    let streamLink = hasLive ? esport.tournaments.now[0].confrontations[0].stream_link : ''

    // https://twitch.tv/lcs
    // https://player.twitch.tv/?channel=cblol&enableExtensions=true&muted=false&parent=twitch.tv&player=popout&quality=chunked&volume=0.1599999964237213
    // https://www.twitch.tv/esl_australia

    // https://www.twitch.tv/epulzegaming

    let channel = ''
    if (hasLive) {
        const url = new URL(streamLink)

        if (url.host === 'www.twitch.tv') {
            channel = url.pathname.substr(1, url.pathname.length)
        }
        else if (url.host === 'player.twitch.tv') {
            channel = url.searchParams.get('channel')
        }

        streamLink = `https://player.twitch.tv/?channel=${channel}&parent=localhost`
        console.log(streamLink)
    }

    return (
        <AppLayout auth={auth}>
            <Head title="ESports" />

            <Container className="mt-4">

                <Breadcrumb>
                    <li className="breadcrumb-item">
                        <Link href={route('home')} role="button">Accueil</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link href={route('esports.index')} role="button">ESports</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link href={route('esports.game', esport.slug)} role="button">{esport.name}</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link href={route('esports.tournament', [esport.slug, tournamentName])} role="button">{tournamentName}</Link>
                    </li>
                    <Breadcrumb.Item active>id</Breadcrumb.Item>
                </Breadcrumb>
                <hr className="my-4"/>

                {hasLive && channel !== '' ? <div className="ratio ratio-16x9">
                    <iframe
                        src={streamLink}
                        title="YouTube video"
                        height="100%"
                        width="100%"
                        allowFullScreen
                    />
                </div> : null}

            </Container>
        </AppLayout>
    )
}
