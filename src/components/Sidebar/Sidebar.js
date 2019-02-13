import { StaticQuery, graphql } from 'gatsby';
import Navigation from './Navigation';
import React from 'react';
import Search from './Search';

const getSection = data => {
	const elements = data.allMdx.edges.map(({node}) => {
		const { fields: { slug, title, alwaysActive, order } } = node;

		return toSectionElements(slug.replace('.html', ''), title, order, alwaysActive);
	});

	let rootElements = elements.filter(path => path.isRoot);

	return rootElements.map(path => toSectionItem(path, elements))
		.sort((a, b) => a.order - b.order);
};

const toSectionElements = (slug, title, order, alwaysActive) => {
	const slugs = slug.split("/");
	const lastSlug = slugs[slugs.length - 1];
	const penultimateSlug = slugs[slugs.length - 2];

	const id = lastSlug === "index" ? penultimateSlug : lastSlug;
	const link = '/' + slug;
	const parentLink = '/' + slug.substring(0, slug.lastIndexOf("/") + 1);
	const isFolder = lastSlug === "index";
	const isRoot = (slugs.length === 3 && isFolder) || (slugs.length === 2 && !isFolder);

	return {id, link, title, parentLink, isFolder, isRoot, order, alwaysActive};
};

const toSectionItem = (item, paths) => {
	if (item.isFolder) {
		item.items = paths.filter(path => path.link !== item.link)
			.filter(path => path.link === (item.parentLink + path.id + (path.isFolder ? "/index" : "")))
			.map(path => toSectionItem(path, paths))
			.sort((a, b) => a.order - b.order);
	}

	return item;
};

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

			let navbarClasses = 'sidebar pt-header position-fixed bg-white shadow';
			if (props.navbarToggled) {
				navbarClasses += ' toggler-expanded';
			}

			return (
				<nav className={navbarClasses} id="clay-sidebar">
					<div className="p-3 p-sm-5">
						<Search placeholder="Search" />

						<Navigation sectionList={getSection(data)} location={props.location} />
					</div>
				</nav>
			)}
		}
	/>
);
