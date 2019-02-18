import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import LayoutNav from '../components/LayoutNav';

const pageTitle = "AlloyEditor | Page 404";

const pageDescription = "A modern WYSIWYG editor built on top of CKEDITOR, designed to create modern and gorgeous web content.";

const pageImage = "/images/home/banner_back.png";

const headerImage = {
    backgroundImage: 'url(/images/home/banner_back.png)'
}

const ErrorPage = () => (
    <>
        <div className="404">
            <Helmet>
                <title>{pageTitle}</title>

                <meta name="description" content={pageDescription} />

                <meta property="og:title" content={pageTitle} />

                <meta property="og:description" content={pageDescription} />

                <meta property="og:image" content={pageImage} />

                <meta name="twitter:card" content="summary_large_image" />

                <meta property="og:site_name" content="AlloyEditor" />

                <meta name="twitter:image:alt" content="AlloyEditor presentation" />
            </Helmet>

            <main className="content">
                <header className="header position-relative bg-primary text-white min-vh-100" style={headerImage}>
                    <LayoutNav />

                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-xl-8 mx-auto text-center">
                                <h1 className="display-2 text-uppercase">Error 404</h1>

                                <p className="h3 font-weight-light mt-5">The page you were looking for is not available.</p>

                                <Link to="/" className="btn btn-lg btn-light text-uppercase mt-4 mt-lg-5 mx-3">
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
            </main>
        </div>
    </>
);

export default ErrorPage;