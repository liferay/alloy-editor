import React, {Component} from 'react';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import {Link} from 'gatsby';
import Typography from '../../Typography';

export default class BlogArticle extends Component {

    render() {
        return (
            <>
                <Breadcrumb activePage={this.props.title} />

                <small>
                    {this.props.author ? `by ${this.props.author}` : ''} | {this.props.date ? `${this.props.date}` : ''}
                </small>

                <h1>{this.props.title}</h1>

                <div className="blog-article">
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
                </div>

                <SocialShare location={this.props.location} />
            </>
        );
    }
};

const SocialShare = (props) => (
    <div className="social">
        <div className="social-banner">
            <p className="social-banner-title">Share this article</p>
        </div>
        <div className="social-buttons">
            <a className="social-button facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${props.location.href}`} target="_blank" rel="noopener noreferrer">
                <svg className="lexicon-icon">
                    <use xlinkHref="/images/icons/icons.svg#social-facebook"></use>
                </svg>
            </a>
            <a className="social-button twitter" href={`https://twitter.com/home?status=${props.location.href}`} target="_blank" rel="noopener noreferrer">
                <svg className="lexicon-icon">
                    <use xlinkHref="/images/icons/icons.svg#twitter"></use>
                </svg>
            </a>
            <a className="social-button linkedin" href={`https://www.linkedin.com/shareArticle?mini=true&amp;url=${props.location.href}`} target="_blank" rel="noopener noreferrer">
                <svg className="lexicon-icon">
                    <use xlinkHref="/images/icons/icons.svg#social-linkedin"></use>
                </svg>
            </a>
        </div>
    </div>
);

const Breadcrumb = (props) => (
    <ol className="breadcrumb">
        <li className="breadcrumb-item">
            <Link className="breadcrumb-link" to="/blog/" title="Return to Blog">
                <span className="breadcrumb-text-truncate">Return to Blog</span>
            </Link>
        </li>
        <li className="active breadcrumb-item">
            <Link className="breadcrumb-link" to="#" title={props.activePage}>
                <span className="breadcrumb-text-truncate" title={props.activePage}>{props.activePage}</span>
            </Link>
        </li>
    </ol>
);