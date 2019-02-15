import { graphql } from 'gatsby';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/Footer';
import CodeTabs from '../components/CodeTabs';
import CodeClipboard from '../components/CodeClipboard';
import LayoutNav from '../components/LayoutNav';

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
        let { mdx: { excerpt, timeToRead, frontmatter: { title } } } = this.props.data;

        return(
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
                                <div className="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                                    <h1 className="">About Themes</h1>
                                    <h2 className="h3 font-weight-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                                    <p className="text-secondary my-5">Integer luctus nibh ex, et ultrices est ornare nec. Praesent in neque dictum, cursus orci vitae, pharetra magna. Aliquam viverra magna quis lacus tempor, ut pharetra urna porta. Aenean accumsan ultricies tempor. Sed ut elementum nibh. Morbi sit amet magna diam. Fusce id augue quis lectus efficitur lobortis. Curabitur ut orci dapibus, viverra dui vel, sagittis velit. Donec et arcu odio.</p>
                                    <p className="text-secondary my-5">Etiam a lacinia ipsum, nec bibendum nulla. Nunc gravida id libero at aliquam. Fusce vitae semper quam, non faucibus turpis. Phasellus hendrerit ut nisi eu cursus. Mauris tristique, est eu iaculis luctus, dolor eros accumsan urna, in tempor magna est et felis. Vestibulum tristique dolor elit, ut bibendum justo bibendum at. Vivamus ornare tellus metus. Integer sodales, nulla non vehicula sagittis, sem neque varius neque, vitae venenatis leo urna nec justo. Ut metus massa, gravida eu mollis eget, porttitor ut nibh. Suspendisse ex ante, ultricies at efficitur at, aliquet condimentum nibh. Cras consectetur metus ac elit hendrerit, nec tristique magna dignissim. Aliquam pharetra purus a varius cursus. Duis vel erat pellentesque tortor gravida blandit nec in nunc.</p>
                                </div>
                            </div>
                        </div>
                    </main>

                    <Footer />
                </div>
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
                mainPage
                stepNumber
                description
                title
            }
            code {
                body
            }
        }
    }
`;