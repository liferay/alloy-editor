import { StaticQuery, graphql } from 'gatsby';
import arrangeIntoTree from '../../utils/arrangeIntoTree';
import Navigation from './Navigation';
import React from 'react';

const getSection = ({allMdx: {edges}}) => {
	const resolveNode = edges.map(({node}) => {
		const {
			slug,
			title,
			weight,
			layout,
		} = node.fields;
		const slugWithoutExtension = slug.replace('.html', '');
		const pathSplit = slugWithoutExtension.split('/');

		return {
			id: pathSplit[pathSplit.length - 1],
			layout,
			link: '/' + slugWithoutExtension,
			title,
			weight,
		};
	});

	return arrangeIntoTree(resolveNode);
}

export default (props) => (
	<StaticQuery
		query={graphql`
			query {
				allMdx(filter: { fields: { slug: { regex: "/^docs/i" } } }) {
					edges {
						node {
							fields {
								layout
								redirect
								slug
								title
								weight
							}
						}
					}
				}
			}
		`}
		render={data => {

			let navbarClasses = 'sidebar pt-header position-fixed bg-light';
			if (props.navbarToggled) {
				navbarClasses += ' toggler-expanded';
			}

			return (
				<nav className={navbarClasses} id="clay-sidebar">
					<div className="p-3 p-sm-5">
						<Navigation sectionList={getSection(data)} location={props.location} />
					</div>
				</nav>
			)}
		}
	/>
);
