import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import React, { Component } from 'react';
import Footer from '../components/Footer';
import LayoutNav from '../components/LayoutNav';
import Auth from '../components/Auth';
import Timeline from '../components/Timeline';

export default class Updates extends Component {
    render() {
        const { data } = this.props;
        const { mdx: { frontmatter: { title, needsAuth, updates }, excerpt, timeToRead } } = data;

        return (
            <Auth needsAuth={needsAuth}>
                <div className="updates">
                    <Helmet>
                        <title>Updates</title>
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
                        <div className="container py-5 text-centerx">
                            <div className="row my-5">
                                <div className="col-12 text-center mb-5">
                                    <h1 className="">Updates</h1>

                                    <h2 className="h3 font-weight-light">Check out what's new</h2>
                                </div>

                                {/* <div className="col-12 col-xl-10 mx-auto mt-5">
                                    <Timeline data={updates} />
                                </div> */}

                                <div className="col-12 update-container">
                                    <div class="update-version position-relative bg-white border border-primary rounded-circle mx-auto d-flex justify-content-center align-items-center mb-0">
                                        <span>1.5.0</span>
                                    </div>

                                    <div className="update-item position-relative w-50 d-flex align-items-center">
                                        <div class="update-icon position-relative bg-white border border-primary rounded-circle flex-shrink-0 p-3 d-flex justify-content-center align-items-center">
                                            <svg class="lexicon-icon m-0">
                                                <use href="/images/icons/icons.svg#home" />
                                            </svg>
                                        </div>

                                        <div class="update-content position-absolute rounded bg-white border border-primary px-4 py-3">
                                            <h3 className="mt-3">Support React 16</h3>

                                            <p className="text-secondary">AlloyEditor can now be overlayed on top of React 16</p>
                                        </div>
                                    </div>

                                    <div className="update-item position-relative w-50 d-flex align-items-center">
                                        <div class="update-icon position-relative bg-white border border-primary rounded-circle flex-shrink-0 p-3 d-flex justify-content-center align-items-center">
                                            <svg class="lexicon-icon m-0">
                                                <use href="/images/icons/icons.svg#sheets" />
                                            </svg>
                                        </div>

                                        <div class="update-content position-absolute rounded bg-white border border-primary px-4 py-3">
                                            <h3 className="mt-3">Bug Fixes</h3>

                                            <p className="text-secondary">Several bug fixes</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 update-container update-minor">
                                    <div class="update-version position-relative bg-white border border-primary rounded-circle mx-auto d-flex justify-content-center align-items-center mb-0">
                                        <span>1.4.1</span>
                                    </div>

                                    <div className="update-item position-relative w-50 d-flex align-items-center">
                                        <div class="update-icon position-relative bg-white border border-primary rounded-circle flex-shrink-0 p-3 d-flex justify-content-center align-items-center">
                                            <svg class="lexicon-icon m-0">
                                                <use href="/images/icons/icons.svg#code" />
                                            </svg>
                                        </div>

                                        <div class="update-content position-absolute rounded bg-white border border-primary px-4 py-3">
                                            <h3 className="mt-3">Bridge Plugins enabled by default</h3>

                                            <p className="text-secondary">AlloyEditor Bridge plugins that allow you to use CKEditor plugins are now enabled by default</p>
                                        </div>
                                    </div>

                                    <div className="update-item position-relative w-50 d-flex align-items-center">
                                        <div class="update-icon position-relative bg-white border border-primary rounded-circle flex-shrink-0 p-3 d-flex justify-content-center align-items-center">
                                            <svg class="lexicon-icon m-0">
                                                <use href="/images/icons/icons.svg#chip" />
                                            </svg>
                                        </div>

                                        <div class="update-content position-absolute rounded bg-white border border-primary px-4 py-3">
                                            <h3 className="mt-3">Fixed several issues</h3>

                                            <p className="text-secondary">Fixed some issues related to languages and focus selection</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 update-container">
                                    <div class="update-version position-relative bg-white border border-primary rounded-circle mx-auto d-flex justify-content-center align-items-center mb-0">
                                        <span>1.4.0</span>
                                    </div>

                                    <div className="update-item position-relative w-50 d-flex align-items-center">
                                        <div class="update-icon position-relative bg-white border border-primary rounded-circle flex-shrink-0 p-3 d-flex justify-content-center align-items-center">
                                            <svg class="lexicon-icon m-0">
                                                <use href="/images/icons/icons.svg#code" />
                                            </svg>
                                        </div>

                                        <div class="update-content position-absolute rounded bg-white border border-primary px-4 py-3">
                                            <h3 className="mt-3">New getButtons API</h3>

                                            <p className="text-secondary">Added a `getButtons` method to easily discover available buttons!</p>
                                        </div>
                                    </div>

                                    <div className="update-item position-relative w-50 d-flex align-items-center">
                                        <div class="update-icon position-relative bg-white border border-primary rounded-circle flex-shrink-0 p-3 d-flex justify-content-center align-items-center">
                                            <svg class="lexicon-icon m-0">
                                                <use href="/images/icons/icons.svg#chip" />
                                            </svg>
                                        </div>

                                        <div class="update-content position-absolute rounded bg-white border border-primary px-4 py-3">
                                            <h3 className="mt-3">Fixed several issues</h3>

                                            <p className="text-secondary">Fixed many bug to improve general stability</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 update-container update-minor">
                                    <div class="update-version position-relative bg-white border border-primary rounded-circle mx-auto d-flex justify-content-center align-items-center mb-0">
                                        <span>1.3.1</span>
                                    </div>

                                    <div className="update-item position-relative w-50 d-flex align-items-center">
                                        <div class="update-icon position-relative bg-white border border-primary rounded-circle flex-shrink-0 p-3 d-flex justify-content-center align-items-center">
                                            <svg class="lexicon-icon m-0">
                                                <use href="/images/icons/icons.svg#code" />
                                            </svg>
                                        </div>

                                        <div class="update-content position-absolute rounded bg-white border border-primary px-4 py-3">
                                            <h3 className="mt-3">Performance in large documents</h3>

                                            <p className="text-secondary">Fixed a bug degrading performance in large documents</p>
                                        </div>
                                    </div>

                                    <div className="update-item position-relative w-50 d-flex align-items-center">
                                        <div class="update-icon position-relative bg-white border border-primary rounded-circle flex-shrink-0 p-3 d-flex justify-content-center align-items-center">
                                            <svg class="lexicon-icon m-0">
                                                <use href="/images/icons/icons.svg#chip" />
                                            </svg>
                                        </div>

                                        <div class="update-content position-absolute rounded bg-white border border-primary px-4 py-3">
                                            <h3 className="mt-3">Autolink for urls with '-'</h3>

                                            <p className="text-secondary">Fixed the autolink plugin to work with urls containing a '-' character</p>
                                        </div>
                                    </div>

                                    <div className="update-item position-relative w-50 d-flex align-items-center">
                                        <div class="update-icon position-relative bg-white border border-primary rounded-circle flex-shrink-0 p-3 d-flex justify-content-center align-items-center">
                                            <svg class="lexicon-icon m-0">
                                                <use href="/images/icons/icons.svg#chip" />
                                            </svg>
                                        </div>

                                        <div class="update-content position-absolute rounded bg-white border border-primary px-4 py-3">
                                            <h3 className="mt-3">Imposible to enter URL in IE</h3>

                                            <p className="text-secondary">Fixed an issue that was preventing to set the URL when editing a link in IE</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-12 update-container">
                                    <div class="update-version position-relative bg-white border border-primary rounded-circle mx-auto d-flex justify-content-center align-items-center mb-0">
                                        <span>1.0.0</span>
                                    </div>
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


export const pageQuery = graphql`
    query($slug: String!) {
        mdx(fields: { slug: { eq: $slug } }) {
            excerpt
            timeToRead
            frontmatter {
                title
                needsAuth
                updates {
                    version
                    major
                    features {
                        icon
                        title
                        description
                        url
                    }
                }
            }
        }
    }
`;