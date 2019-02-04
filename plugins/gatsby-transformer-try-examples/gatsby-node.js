const {readdirSync, readFileSync} = require('fs');
const {join, resolve} = require('path');

exports.sourceNodes = ({graphql, actions}) => {
    const {createNode} = actions;

    const path = resolve(__dirname, '../../examples');
    const files = readdirSync(path);

    files.forEach(file => {
        if (file.match(/\.js$/)) {
            const code = readFileSync(join(path, file), 'utf8');
            const id = file.replace(/\.js$/, '');

            createNode({
                id,
                children: [],
                parent: 'EXAMPLES',
                internal: {
                    type: 'ExampleCode',
                    contentDigest: JSON.stringify(code),
                },
            });
        }
    });
};