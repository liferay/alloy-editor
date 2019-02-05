import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import LayoutNav from '../components/LayoutNav';
import {WOW} from 'wowjs';
import Footer from '../components/Footer';

class Index extends Component {
    componentDidMount() {
        this._wow = new WOW();
        this._wow.init();
    }

    componentWillUnmount() {
        this._wow = null;
    }

    render() {
        const description = "Your all-about-liferay-themes place 💖";

        const headerImage = {
            backgroundImage: 'url(https://alloyeditor.com/images/banner_back.png)'
        }

        return (
            <div className="home">
                <Helmet>
                    <title>{process.env.PROJECT_NAME}</title>
                    <meta name="description" content={description} />
                    <meta name="og:description" content={description} />
                    <meta name="twitter:description" content={description} />
                    <meta name="og:title" content={process.env.PROJECT_NAME} />
                </Helmet>

                <main className="content">
                    <header className="header position-relative bg-primary text-white" style={headerImage}>
                        <LayoutNav />

                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-xl-8 mx-auto text-center">
                                    <h1 className="display-2 text-uppercase">Alloy<strong>Editor</strong></h1>

                                    <p className="h3 font-weight-light mt-5">A modern WYSIWYG editor built on top of CKEDITOR, designed to create modern and gorgeous web content.</p>

                                    <p className="small font-weight-bold mt-5">Supported browsers: IE9+, Edge, Chrome, Firefox, Safari</p>

                                    <Link to="/docs/" className="btn btn-lg btn-light text-uppercase mt-4 mt-lg-5 mx-3">
                                        Get Started
                                    </Link>

                                    <Link to="/docs/" className="btn btn-lg btn-outline-light text-uppercase mt-4 mt-lg-5 mx-3">
                                        Download (1.5.0)
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </header>

                    <section className="py-4 py-sm-5 bg-dark">
                        <div className="container my-lg-5">
                            <div className="row">
                                <div className="col-12 col-xl-10 mx-auto">
                                    <div className="bg-white p-3 p-sm-5">Live Editor placeholder</div>
                                    <div className="bg-white py-5"></div>
                                    <div className="bg-white py-5"></div>
                                    <div className="bg-white py-5"></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-xl-10 mx-auto">
                                    <div className="row my-row">
                                        <div className="col-12 col-lg-6 order-lg-1 text-center text-lg-right">
                                            <img className="img-fluid" alt="" src="https://alloyeditor.com/images/landing_features/features_ui.png" />
                                        </div>

                                        <div className="col-12 col-lg-6 text-center text-lg-left">
                                            <h2 className="h1 font-weight-bold mt-5 mt-lg-0">The core is separated from the UI</h2>

                                            <p className="mt-4">The main idea behind the editor is to fully separate the core from the UI. And not only to separate it, but to allow people to easily add new Buttons and Toolbars or event to create a completely new UI based on a different Framework or even vanilla JavaScript.</p>

                                            <p className="mt-4">The core AlloyEditor uses CKEditor under the hood to deal with the editable content.This means the existing CKEditor plugins can be reused.</p>
                                        </div>
                                    </div>

                                    <div className="row my-row text-center text-lg-left">
                                        <div className="col-12 col-lg-6">
                                            <img className="img-fluid" alt="" src="https://alloyeditor.com/images/landing_features/features_estanterias.png" />
                                        </div>

                                        <div className="col-12 col-lg-6">
                                            <h2 className="h1 font-weight-bold mt-5 mt-lg-0">So many things to do!</h2>

                                            <p className="mt-4">AlloyEditor comes out of the box with as much editing power as you'll probably ever need, but we plan to keep on adding new features so you can edit your content in any way you can imagine.</p>

                                            <p className="mt-4">Community Powered In addition to the out of the box options, AlloyEditor you can easily leverage any of the existing functionality and plugins developed for CKEditor.</p>
                                        </div>
                                    </div>

                                    <div className="row my-row">
                                        <div className="col-12 col-lg-6 order-lg-1 text-center text-lg-right">
                                            <img className="img-fluid" alt="" src="https://alloyeditor.com/images/landing_features/features_corazon.png" />
                                        </div>

                                        <div className="col-12 col-lg-6 text-center text-lg-left">
                                            <h2 className="h1 font-weight-bold mt-5 mt-lg-0">We <svg class="lexicon-icon text-danger"><use href="/images/icons/icons.svg#heart" /></svg><span class="sr-only">love</span> writing</h2>

                                            <h3 class="highlight-title"></h3>

                                            <p className="mt-4">In the AlloyEditor team, we believe the content is the king, and so, we want to create a simple user interface where what you write is all that really matters.</p>

                                            <p className="mt-4">After years of suffering bloated and outdated user interfaces, AlloyEditor will turn any Web editing moment into a peaceful experience.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-light py-5">
                        <div className="container my-sm-5">
                            <div className="row">
                                <div className="col-12 col-xl-8 mx-auto">
                                    <h2 className="h1 font-weight-bold text-center">Testimonials</h2>

                                    <div className="row mt-5 text-center text-md-left">
                                        <div className="col-12 col-md-2">
                                            <svg class="lexicon-icon text-primary display-1"><use href="/images/icons/icons.svg#announcement" /></svg>
                                        </div>

                                        <div className="col-12 col-md-10">
                                            <p className="mt-5 mt-md-0">"The new AlloyEditor is so intuitive, simple, and useful that you won't realize you are actually using an editor. Just focus on the content while AlloyEditor takes care of all the rest."</p>

                                            <p className="small font-weight-bold">— Sergio González, Collaboration Lead, Liferay Inc.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Footer />
                </main>
            </div>
        )
    };
}

export default Index;
