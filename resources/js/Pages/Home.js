import React from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import { Container } from 'react-bootstrap';

import AppLayout from '@/Layouts/AppLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Home(props) {
    return (
        <AppLayout {...props}>
            <Head title="Accueil" />

            <div className="px-4 py-5 text-center text-light" style={{
                backgroundImage: 'url(https://www.studyrama.com/IMG/arton107792.png)',
                backgroundSize: 'cover'
            }}>
                <Link className="text-center" href="/">
                    <ApplicationLogo width={200} height={200}/>
                </Link>
                <h1 className="display-5 fw-bold">RI7 E-Sport</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis fuga illo non perspiciatis voluptas! Accusamus animi atque consequatur, cum deleniti distinctio ea eligendi excepturi facilis nesciunt non nostrum, quod vitae.
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Voir les tournois</button>
                        <button type="button" className="btn btn-dark btn-lg px-4">Nous-contactez</button>
                    </div>
                </div>
            </div>

            <Container className="px-4 py-5 text-light" id="featured-3">
                <div className="text-center">
                    <h2 className="pb-5 border-bottom">Fonctionnalités</h2>
                </div>
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    <div className="feature col">
                        <h2>Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                            sentence and probably just keep going until we run out of words.</p>
                        <a href="#" className="icon-link text-primary">
                            Call to action
                            <svg className="bi" width="1em" height="1em">
                                <use xlinkHref="#chevron-right" />
                            </svg>
                        </a>
                    </div>
                    <div className="feature col">
                        <h2>Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                            sentence and probably just keep going until we run out of words.</p>
                        <a href="#" className="icon-link text-primary">
                            Call to action
                            <svg className="bi" width="1em" height="1em">
                                <use xlinkHref="#chevron-right" />
                            </svg>
                        </a>
                    </div>
                    <div className="feature col">
                        <h2>Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                            sentence and probably just keep going until we run out of words.</p>
                        <a href="#" className="icon-link text-primary">
                            Call to action
                            <svg className="bi" width="1em" height="1em">
                                <use xlinkHref="#chevron-right" />
                            </svg>
                        </a>
                    </div>
                </div>
            </Container>

            <div className="bg-dark text-light">
                <Container className="px-4 py-5" id="custom-cards">
                    <div className="text-center">
                        <h2 className="pb-5 border-bottom">Nos jeux</h2>
                    </div>
                    <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                        <div className="col">
                            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
                                 style={{
                                     backgroundImage:'url(https://media.contentapi.ea.com/content/dam/gin/images/2021/06/battlefield-2042-key-art.jpg.adapt.crop1x1.767p.jpg)'
                                 }}>
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                    <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Short title, long jacket</h2>
                                    <ul className="d-flex list-unstyled mt-auto">
                                        <li className="me-auto">
                                            <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32"
                                                 className="rounded-circle border border-white" />
                                        </li>
                                        <li className="d-flex align-items-center me-3">
                                            <svg className="bi me-2" width="1em" height="1em">
                                                <use xlinkHref="#geo-fill" />
                                            </svg>
                                            <small>Earth</small>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <svg className="bi me-2" width="1em" height="1em">
                                                <use xlinkHref="#calendar3" />
                                            </svg>
                                            <small>3d</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
                                 style={{
                                     backgroundImage:'url(https://images.news18.com/ibnlive/uploads/2019/09/PubG-Game-1.jpg?impolicy=website&width=0&height=0)'
                                 }}>
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                    <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Short title, long jacket</h2>
                                    <ul className="d-flex list-unstyled mt-auto">
                                        <li className="me-auto">
                                            <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32"
                                                 className="rounded-circle border border-white" />
                                        </li>
                                        <li className="d-flex align-items-center me-3">
                                            <svg className="bi me-2" width="1em" height="1em">
                                                <use xlinkHref="#geo-fill" />
                                            </svg>
                                            <small>Earth</small>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <svg className="bi me-2" width="1em" height="1em">
                                                <use xlinkHref="#calendar3" />
                                            </svg>
                                            <small>3d</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
                                 style={{
                                     backgroundImage:'url(https://i2-prod.manchestereveningnews.co.uk/incoming/article22044790.ece/ALTERNATES/s615/0_Screenshot-9.png)'
                                 }}>
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                    <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Short title, long jacket</h2>
                                    <ul className="d-flex list-unstyled mt-auto">
                                        <li className="me-auto">
                                            <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32"
                                                 className="rounded-circle border border-white" />
                                        </li>
                                        <li className="d-flex align-items-center me-3">
                                            <svg className="bi me-2" width="1em" height="1em">
                                                <use xlinkHref="#geo-fill" />
                                            </svg>
                                            <small>Earth</small>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <svg className="bi me-2" width="1em" height="1em">
                                                <use xlinkHref="#calendar3" />
                                            </svg>
                                            <small>3d</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </AppLayout>
    )
}
