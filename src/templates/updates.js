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

                                <Timeline data={updates} />
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