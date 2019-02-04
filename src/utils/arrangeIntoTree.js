function findWhere(array, key, value) {
	let t = 0;
	while (t < array.length && array[t][key] !== value) { t++; };

	if (t < array.length) {
		return array[t]
	} else {
		return false;
	}
}

function arrangeIntoTree(paths) {
	let tree = [];

	for (let i = 0; i < paths.length; i++) {
		const node = paths[i];

		if (node.id === 'index' && node.layout === 'redirect') {
			continue;
		}

		const path = node.link.split('/').filter(elem => elem);
        let currentLevel = tree || [];
		for (let j = 0; j < path.length; j++) {
			let part = path[j];

			// Last part of the path, just add it to the current level
			if (j === path.length - 1) {
				currentLevel.push(node);
				break;
			}

			let existingPath = findWhere(currentLevel || [], 'id', part);

			// If the path exist, navigate, if not, create it and navigate
			if (existingPath) {
				currentLevel = existingPath.items || [];
			} else {
				let nodePart = paths.find(elem => elem.link.endsWith(`/${part}/index`));
				let newPart = {
					id: part,
					items: [],
					title: nodePart.title,
					weight: nodePart.weight,
				}

				currentLevel.push(newPart);
				currentLevel = newPart.items;
			}
		}
	}

	sortBy(tree[0]);

	return tree[0].items;
}

const regexSpace = /\s+/g;

function sortBy(tree) {
	if (tree.items) {
		/* eslint-disable */
		tree.items = tree.items.sort((a, b) => {
			let titleA = a.title.toUpperCase().replace(regexSpace, '');
			let titleB = b.title.toUpperCase().replace(regexSpace, '');

			if (a.weight < b.weight) return 1;
			if (a.weight > b.weight) return -1;

			if (titleA > titleB) return 1;
			if (titleA < titleB) return -1;
		});
		/* eslint-enable */

		tree.items.map((item) => sortBy(item));
	}

	return tree;
}

module.exports = arrangeIntoTree;