// This is the list page of themes, at the moment we are not using this page

import { Link, graphql } from 'gatsby';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/Footer';
import CodeTabs from '../components/CodeTabs';
import CodeClipboard from '../components/CodeClipboard';
import LayoutNav from '../components/LayoutNav';
import Auth from '../components/Auth';

export default class Onboarding extends Component {
    componentDidMount() {
        this._codeTabs = new CodeTabs();
        this._codeClipboard = new CodeClipboard();
    }

    componentWillUnmount() {
        this._codeTabs = null;
        this._codeClipboard.dispose();
    }

    render() {

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

        return(
            <Auth needsAuth={needsAuth}>
                <div className="onboarding">
                    <Helmet>
                        <title>{title}</title>
                        <meta name="description" content={excerpt} />
                        <meta name="og:description" content={excerpt} />
                        <meta name="twitter:description" content={excerpt} />
                        <meta name="og:title" content="Blog Template" />
                        <meta name="og:type" content="article" />
                        <meta name="twitter.label1" content="Reading time" />
                        <meta
                            name="twitter:data1"
                            content={`${timeToRead} min read`}
                        />
                    </Helmet>
                    <header>
                        <LayoutNav effect={true} static={true} />
                    </header>
                    <main className="pt-header bg-light">
                        <div className="container py-5">
                            <div className="row my-5">
                                <div className="col-12">
                                    <h1 className="">Liferay Themes</h1>
                                    <p className="h4 font-weight-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col-12">
                                    <h2 className="h4 text-secondary">7.2</h2>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/", "/images/themes/creative.jpg", "", "7.1+", "Stylish Portfolio", "Corporate Theme")}
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/", "/images/themes/stylish-portfolio.jpg", "", "7.1+", "Stylish Portfolio", "Creative Theme")}
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/", "/images/themes/grayscale.jpg", "", "6.2+", "Grayscale", "Blog Theme")}
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/", "/images/themes/porygon.jpg", "", "6.2+", "Porygon", "Magazine Theme")}
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/", "/images/themes/creative.jpg", "", "7.1+", "Stylish Portfolio", "Corporate Theme")}
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col-12">
                                    <h2 className="h4 text-secondary">7.1</h2>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/", "/images/themes/creative.jpg", "", "7.1+", "Stylish Portfolio", "Corporate Theme")}
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/", "/images/themes/stylish-portfolio.jpg", "", "7.1+", "Stylish Portfolio", "Creative Theme")}
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/", "/images/themes/grayscale.jpg", "", "6.2+", "Grayscale", "Blog Theme")}
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col-12">
                                    <h2 className="h4 text-secondary">7.0</h2>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/", "/images/themes/creative.jpg", "", "7.1+", "Stylish Portfolio", "Corporate Theme")}
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    {latestThemeCard("/docs/", "/images/themes/stylish-portfolio.jpg", "", "7.1+", "Stylish Portfolio", "Creative Theme")}
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </Auth>
        );
    }
}