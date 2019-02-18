import {graphql} from 'gatsby';
import Helmet from 'react-helmet';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import React, {Component} from 'react';

import Sidebar from '../components/Sidebar';
import LayoutNav from '../components/LayoutNav';
import CodeTabs from '../components/CodeTabs';
import CodeClipboard from '../components/CodeClipboard';
import Footer from '../components/Footer';

export default class Docs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navbarToggled: false,
		};
	}

	componentDidMount() {
		this._codeTabs = new CodeTabs();
		this._codeClipboard = new CodeClipboard();
	}

	componentWillUnmount() {
		this._codeTabs = null;
		this._codeClipboard.dispose();
	}

	docsNavbarToggleClick() {
		this.setState(prevState => ({
			navbarToggled: !prevState.navbarToggled,
		}));
	}

	render() {
		const {data, location} = this.props;

		const {
			mdx: {
				code,
				frontmatter: {title},
				excerpt,
			},
		} = data;

		const pageTitle = 'AlloyEditor | ' + title;

		const pageDescription = excerpt;

		const pageImage = '/images/home/banner_back.png';

		return (
			<div className="docs">
				<Helmet>
					<title>{pageTitle}</title>

					<meta name="description" content={pageDescription} />

					<meta property="og:title" content={pageTitle} />

					<meta property="og:description" content={pageDescription} />

					<meta property="og:image" content={pageImage} />

					<meta name="twitter:card" content="summary_large_image" />

					<meta property="og:site_name" content="AlloyEditor" />

					<meta
						name="twitter:image:alt"
						content="AlloyEditor presentation"
					/>
				</Helmet>

				<main className="content">
					<header>
						<LayoutNav
							effect={true}
							static={true}
							sidebarHamburguerIcon={true}
							onNavbarToggleClick={this.docsNavbarToggleClick.bind(
								this
							)}
						/>
					</header>

					<section>
						<Sidebar
							location={location}
							navbarToggled={this.state.navbarToggled}
						/>

						<div className="sidebar-offset pt-header">
							<div className="py-5 bg-dark text-white">
								<div className="container">
									<div className="row">
										<div className="col-md-12">
											<h1 className="text-center my-5">
												{title}
											</h1>
										</div>
									</div>
								</div>
							</div>

							<div className="py-4 p-sm-5 min-vh-100">
								<div className="container">
									<div className="row">
										<div className="col-md-12 col-xl-8 mx-auto">
											<article className="docs-content">
												<MDXRenderer>
													{code.body}
												</MDXRenderer>
											</article>
										</div>
									</div>
								</div>
							</div>

							<Footer />
						</div>
					</section>
				</main>
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
			}
			code {
				body
			}
		}
	}
`;
