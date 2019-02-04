const path = require('path');
const docs = require('documentation');
const evaluateInstance = require('./visit');
const fs = require('fs');
const visit = require('unist-util-visit');

function generateTr(item) {
    return `<tr>
        <td><div class="table-title">${item.property}</div></td>
        <td>${item.description}</td>
        <td>${item.type}</td>
        <td>${item.required}</td>
        <td>${item.default}</td>
    </tr>`;
}

module.exports = ({markdownAST}) => {
    let markdownHtmlNodes = [];

    visit(markdownAST, 'html', node => {
        if (node.value.includes("[APITable")) {
            markdownHtmlNodes.push(node);
        }
    });

    return Promise.all(
        markdownHtmlNodes.map(
            node =>
                new Promise(async resolve => {
                    const pathFile = path.resolve('../packages/', node.value.split('"')[1]);

                    await docs.build([pathFile], { shallow: true })
                        .then(docs.formats.json)
                        .then(output => {
                            const json = JSON.parse(output);
                            const documentation = evaluateInstance(json[0].members.instance);

                            node.value = `<div class="table-responsive">
                                <table class="table table-autofit">
                                    <thead>
                                        <tr>
                                            <th>Property</th>
                                            <th>Description</th>
                                            <th>Type</th>
                                            <th>Required</th>
                                            <th>Default</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${documentation.map(generateTr).join('')}
                                    </tbody>
                                </table>
                            </div>`;
                            resolve(node);
                        });
                })
        )
    );
};