const visit = require("unist-util-visit");

module.exports = ({ markdownAST }) => {
    visit(markdownAST, "code", node => {
        if (node.lang) {
            const [lang, label] = node.lang.split(" ");

            node.lang = lang;
            node.label = label || lang;
        }

        return node;
    });
};
