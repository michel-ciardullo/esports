import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react'
import { Container, Breadcrumb } from 'react-bootstrap'

import AppLayout from '@/Layouts/AppLayout'

export default function ESportsConfrontation({ auth, esport }) {

    const tournamentName = (esport.tournaments.yesterday.length > 0 ? esport.tournaments.yesterday[0].name : null)
        || (esport.tournaments.now.length > 0 ? esport.tournaments.now[0].name : null)
        || (esport.tournaments.today.length > 0 ? esport.tournaments.today[0].name : null)
        || (esport.tournaments.tomorrow.length > 0 ? esport.tournaments.tomorrow[0].name : null)

    let streamLink = esport.tournaments.now.length ? esport.tournaments.now[0].confrontations[0].stream_link : ''
    let channel = ''
    // https://twitch.tv/lcs
    // https://player.twitch.tv/?channel=cblol&enableExtensions=true&muted=false&parent=twitch.tv&player=popout&quality=chunked&volume=0.1599999964237213
    // https://www.twitch.tv/esl_australia
    // https://player.twitch.tv/?channel=winline_d2cl&enableExtensions=true&muted=true&parent=twitch.tv&player=popout&quality=auto&volume=0.5
    // https://player.twitch.tv/?channel=esl_csgo&enableExtensions=true&muted=true&parent=twitch.tv&player=popout&quality=auto&volume=0.5


    if (/^https:\/\/twitch\.tv\/(.*?)$/.test(streamLink))
    {
        channel = /^https:\/\/twitch\.tv\/(.*?)$/.exec(streamLink)[1]
        console.log("premier")
    }
    else if (/^https:\/\/www.twitch.tv\/(.*?)$/.test(streamLink))
    {
        channel = /^https:\/\/www.twitch.tv\/(.*?)$/.exec(streamLink)[1]
        console.log("deuxieme")
    }
    else if (/https:\/\/player.twitch.tv\/\?channel=(.*?)&enableExtensions=true&muted=false&parent=twitch.tv&player=popout&quality=chunked&volume=0.1599999964237213/.test(streamLink))
    {
        console.log("troisieme")
        channel = /https:\/\/player.twitch.tv\/\?channel=(.*?)&enableExtensions=true&muted=false&parent=twitch.tv&player=popout&quality=chunked&volume=0.1599999964237213/.exec(streamLink)[1]
    }
    else if (/https:\/\/player.twitch.tv\/?channel=(.*?)&enableExtensions=true&muted=true&parent=twitch.tv&player=popout&quality=auto&volume=0.5/.test(streamLink))
    {
        console.log("quatrieme")
        channel = /https:\/\/player.twitch.tv\/?channel=(.*?)&enableExtensions=true&muted=true&parent=twitch.tv&player=popout&quality=auto&volume=0.5/.exec(streamLink)[1]
    }
    else if (/https:\/\/player.twitch.tv\/?channel=(.*?)&enableExtensions=true&muted=true&parent=twitch.tv&player=popout&quality=auto&volume=0.5/.test(streamLink))
    {
        console.log("5")
        channel = /https:\/\/player.twitch.tv\/?channel=(.*?)&enableExtensions=true&muted=true&parent=twitch.tv&player=popout&quality=auto&volume=0.5/.exec(streamLink)[1]
    }

    streamLink = `https://player.twitch.tv/?channel=${channel}&parent=localhost`

    return (
        <AppLayout auth={auth}>
            <Head title="ESports" />

            <Container className="margin-children">

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

                {channel ? <div className="ratio ratio-16x9">
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
    );
}
