YUI.add('selector-patch', function(Y) {
    'use strict';

    Y.mix(Y.Selector, {
        test: function(node, selector, root) {
            var defaultId,
                ret = false,
                useFrag = false,
                groups,
                parent,
                item,
                items,
                frag,
                id,
                i, j, group;

            if (node && node.tagName) { // only test HTMLElements

                if (typeof selector == 'function') { // test with function
                    ret = selector.call(node, node);
                } else { // test with query
                    // we need a root if off-doc
                    groups = selector.split(',');
                    if (!root && !Y.DOM.inDoc(node)) {
                        parent = node.parentNode;
                        if (parent) {
                            root = parent;
                        } else { // only use frag when no parent to query
                            frag = node.ownerDocument.createDocumentFragment();
                            frag.appendChild(node);
                            root = frag;
                            useFrag = true;
                        }
                    }
                    root = root || node.ownerDocument;

                    id = Y.Selector._escapeId(Y.DOM.getId(node));
                    if (!id) {
                        defaultId = true;
                        id = Y.guid();
                        Y.DOM.setId(node, id);
                    }

                    for (i = 0; (group = groups[i++]);) { // TODO: off-dom test
                        group += '[id="' + id + '"]';
                        items = Y.Selector.query(group, root);

                        for (j = 0; (item = items[j++]);) {
                            if (item === node) {
                                ret = true;
                                break;
                            }
                        }
                        if (ret) {
                            break;
                        }
                    }

                    if (useFrag) { // cleanup
                        frag.removeChild(node);
                    }

                    if (defaultId) { // cleanup, remove auto added ID
                        node.removeAttribute('id');
                    }
                }
            }

            return ret;
        }
    }, true);
}, '', {
    requires: ['selector-native']
});