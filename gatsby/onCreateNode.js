module.exports = exports.onCreateNode = ({ node, actions, getNode}) => {
	const {createNodeField} = actions;

	if (node.internal.type === 'Mdx') {
		const {
			layout,
			path,
			redirect,
			title,
			order,
			date,
			description,
			author,
			mainPage,
			banner,
			stepNumber,
			needsAuth,
			updates
		} = node.frontmatter;

		const {relativePath} = getNode(node.parent);

		let slug = path;

		if (!slug) {
			slug = relativePath.replace('.md', '.html');
		}

		createNodeField({
			name: 'title',
			node,
			value: node.frontmatter.title,
		});

		createNodeField({
			node,
			name: 'slug',
			value: slug,
		});

		createNodeField({
			node,
			name: 'title',
			value: title,
		});

		createNodeField({
			node,
			name: 'order',
			value: order || 0,
		});

		createNodeField({
			node,
			name: 'redirect',
			value: redirect,
		});

		createNodeField({
			node,
			name: 'layout',
			value: layout,
		});

		createNodeField({
			node,
			name: 'author',
			value: author || '',
		});

		createNodeField({
			node,
			name: 'date',
			value: date || '',
		});

		createNodeField({
			node,
			name: 'description',
			value: description || '',
		});

		createNodeField({
			node,
			name: 'mainPage',
			value: mainPage || false,
		});

		createNodeField({
			node,
			name: 'banner',
			value: banner || '',
		});

		createNodeField({
			node,
			name: 'stepNumber',
			value: stepNumber || 0,
		});

		createNodeField({
			node,
			name: 'needsAuth',
			value: needsAuth || 0,
		});

		createNodeField({
			node,
			name: 'updates',
			value: updates || [],
		})
	}
};
