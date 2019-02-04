import { Link } from 'gatsby';
import React, { Component } from 'react';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import Typography from '../../Typography';

export default class OnboardingMain extends Component {
    render() {
        return (
            <div className="onboarding-main">
                <MDXRenderer
                    components={{
                        h1: Typography.H1,
                        h2: Typography.H2,
                        h3: Typography.H3,
                        h4: Typography.H4,
                        p: Typography.P,
                    }}
                >
                    {this.props.codeBody}
                </MDXRenderer>
                <div className="social">
                    <div className="social-buttons">
                        <div className="btn-group">
                            <div className="btn-group-item">
                                <Link to="onboarding/one.html" className="btn btn-primary">Get Started</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};