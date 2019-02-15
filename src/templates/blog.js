import {graphql} from 'gatsby';
import Helmet from 'react-helmet';
import React, {Component} from 'react';
import Footer from '../components/Footer';
import CodeTabs from '../components/CodeTabs';
import CodeClipboard from '../components/CodeClipboard';
import BlogMain from '../components/Blog/BlogMain';
import BlogArticle from '../components/Blog/BlogArticle';
import LayoutNav from '../components/LayoutNav';

export default class Blog extends Component {
	componentDidMount() {
		this._codeTabs = new CodeTabs();
		this._codeClipboard = new CodeClipboard();
	}

	componentWillUnmount() {
		this._codeTabs = null;
		this._codeClipboard.dispose();
	}

	render() {
		const {data} = this.props;
		const {
			mdx: {
				code,
				frontmatter: {title, mainPage, date, author},
				excerpt,
				timeToRead,
			},
		} = data;

		return (
			<div className="blog">
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
				<main className="content">
					<header className="header">
						<LayoutNav opaque={!mainPage} fixed={mainPage} />
						{mainPage && (
							<div className="container-fluid">
								<div className="row">
									<div className="intro blog-intro text-center col">
										<div className="container-fluid container-fluid-max-xl">
											<h1 className="h1">
												Blog Template
											</h1>
											<h2 className="h3">
												Where good ideas come from
											</h2>
										</div>
									</div>
								</div>
							</div>
						)}
					</header>

					<div className="clay-site-container container">
						<div className="row">
							<div className="col-md-12">
								{/*renders a blog post content */}
								{!mainPage && (
									<article>
										<BlogArticle
											title={title}
											author={author}
											date={date}
											codeBody={code.body}
											location={this.props.location}
										/>
									</article>
								)}

								{/* renders the main page */}
								{mainPage && (
									<BlogMain
										title={title}
										excerpt={excerpt}
										timeToRead={timeToRead}
									/>
								)}
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
		mdx(fields: {slug: {eq: $slug}}) {
			excerpt
			timeToRead
			frontmatter {
				title
				mainPage
				date(formatString: "MMMM DD, YYYY")
				author
			}
			code {
				body
			}
		}
	}
`;
