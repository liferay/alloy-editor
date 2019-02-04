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

        const latestThemeCard = (url, imageSrc, imageAlt, version, title, text) => {
            return (
                <Link to={url} className="card card-type-asset image-card text-decoration-none p-3 p-sm-4 mt-4">
                    <div className="aspect-ratio bg-checkered">
                        <img className="aspect-ratio-item-center-middle aspect-ratio-item-fluid" alt={imageAlt} src={imageSrc} />
                    </div>
                    <span class="sticker sticker-top-right sticker-light px-3 py-2 mt-3">{version}</span>
                    <div className="card-body p-0">
                        <h3 className="card-title text-truncate mt-2">{title}</h3>    
                        <p className="card-text text-secondary text-truncate mt-2">{text}</p>
                    </div>
                </Link>
            );
        };

        const allThemeCard = (url, imageSrc, imageAlt, version) => {
            return (
                <Link to={url} className="card card-type-asset text-decoration-none p-2 p-sm-3 mt-4">
                    <div className="aspect-ratio bg-checkered">
                        <img className="aspect-ratio-item-center-middle aspect-ratio-item-fluid" alt={imageAlt} src={imageSrc} />
                    </div>
                    <span class="sticker sticker-top-right sticker-light px-2 py-1 mt-1">{version}</span>
                </Link>
            );
        };

        // const headerImage = {
        //     backgroundImage: 'url(https://www.xmple.com/wallpaper/white-lines-stripes-streaks-grey-5120x2880-c2-ffffff-dcdcdc-l2-54-108-a-30-f-1.svg)'
        // }

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
                    <header className="header position-relative bg-primary text-white">
                        {/* <div className="header-image position-absolute w-100 h-100" style={headerImage}></div> */}

                        <LayoutNav />

                        <div className="container">
                            <div className="row">
                                <div className="d-none d-lg-block col-lg-6 offset-lg-6">
                                    <img className="img-fluid mb-n5 px-5" alt="" src="/images/themes/stylish-portfolio.jpg" />
                                </div>

                                <div className="col-12">
                                    {/*
                                    <h1 className="h1">{process.env.PROJECT_NAME}</h1>
                                    <h2 className="h3">{description}</h2>
                                    */}
                                    <h2 className="h3 font-weight-light">Theming Site</h2>
                                    <h1 className="title-1 font-weight-bold">Lorem ipsum dolor<br />sit amet consectetur adipiscing elit.</h1>
                                    <Link to="/docs/" className="btn btn-lg btn-white btn-box-shadow mt-4 mt-lg-5">
                                        View Themes
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </header>

                    <section className="themes-latest bg-light">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="h3 font-weight-bold text-secondary mb-0">Lastest Themes:</h2>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/Creative/detail.html", "/images/themes/creative.jpg", "", "7.1+", "Stylish Portfolio", "Corporate Theme")}
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/Stylish-portfolio/detail.html", "/images/themes/stylish-portfolio.jpg", "", "7.1+", "Stylish Portfolio", "Creative Theme")}
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/Grayscale/detail.html", "/images/themes/grayscale.jpg", "", "6.2+", "Grayscale", "Blog Theme")}
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/Porygon/detail.html", "/images/themes/porygon.jpg", "", "6.2+", "Porygon", "Magazine Theme")}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="themes-all bg-light2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="h3 font-weight-bold text-secondary mb-0">All Themes:</h2>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6 col-md-4 col-lg-2">
                                    {allThemeCard("/docs/Creative/detail.html", "/images/themes/creative.jpg", "", "7.1+")}
                                </div>
                                <div className="col-6 col-md-4 col-lg-2">
                                    {allThemeCard("/docs/Stylish-portfolio/detail.html", "/images/themes/stylish-portfolio.jpg", "", "7.1+")}
                                </div>
                                <div className="col-6 col-md-4 col-lg-2">
                                    {allThemeCard("/docs/Grayscale/detail.html", "/images/themes/grayscale.jpg", "", "6.2+")}
                                </div>
                                <div className="col-6 col-md-4 col-lg-2">
                                    {allThemeCard("/docs/Porygon/detail.html", "/images/themes/porygon.jpg", "", "6.2+")}
                                </div>
                                <div className="col-6 col-md-4 col-lg-2">
                                    {allThemeCard("/docs/Fjord/detail.html", "/images/themes/fjord.jpg", "", "6.2+")}
                                </div>
                                <div className="col-6 col-md-4 col-lg-2">
                                    {allThemeCard("/docs/Westeros-bank/detail.html", "/images/themes/westeros_bank.jpg", "", "6.2+")}
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
