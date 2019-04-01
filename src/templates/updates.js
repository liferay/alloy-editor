import {graphql} from 'gatsby';
import Helmet from 'react-helmet';
import React, {Component} from 'react';
import Footer from '../components/Footer';
import LayoutNav from '../components/LayoutNav';
import Timeline from '../components/Timeline';

export default class Updates extends Component {
	render() {
		const {data} = this.props;

		const {
			mdx: {
				frontmatter: {title, updates},
				excerpt,
			},
		} = data;

		const pageTitle = 'AlloyEditor | ' + title;

		const pageDescription = excerpt;

		const pageImage = '/images/home/banner_back.png';

		return (
			<div className="updates">
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

				<header>
					<LayoutNav effect={true} static={true} />
				</header>

				<main className="pt-header bg-light">
					<div className="container py-5 text-centerx">
						<div className="row my-5">
							<div className="col-12 text-center mb-5">
								<h1 className="">Updates</h1>

								<h2 className="h3 font-weight-light">
									Check out what&#39;s new
								</h2>
							</div>

							<Timeline data={updates} />
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
