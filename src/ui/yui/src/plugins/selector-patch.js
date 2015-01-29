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

    var SELECTOR = Y.Selector,

        //CSS_HIDE = Y.getClassName('hide'),
        CSS_HIDE = 'hide',
        REGEX_HIDDEN_CLASSNAMES = new RegExp(CSS_HIDE);

    SELECTOR._isNodeHidden = function(node) {
        var width = node.offsetWidth;
        var height = node.offsetHeight;
        var ignore = node.nodeName.toLowerCase() === 'tr';
        var className = node.className;
        var nodeStyle = node.style;

        var hidden = false;

        if (!ignore) {
            if (width === 0 && height === 0) {
                hidden = true;
            }
            else if (width > 0 && height > 0) {
                hidden = false;
            }
        }

        hidden = hidden || (nodeStyle.display === 'none' || nodeStyle.visibility === 'hidden') ||
            REGEX_HIDDEN_CLASSNAMES.test(className);

        return hidden;
    };

    var testNodeType = function(type) {
        return function(node) {
            return node.type === type;
        };
    };

    /**
     * Augment the [YUI3 Selector](Selector.html) with more util methods.
     *
     * @class A.Selector
     * @uses Selector
     * @constructor
     */
    Y.mix(
        SELECTOR.pseudos, {
            /**
             * Checks if the node is a button element or contains `type="button"`.
             *
             * @method button
             * @param node
             * @return {Boolean}
             */
            button: function(node) {
                return node.type === 'button' || node.nodeName.toLowerCase() === 'button';
            },

            /**
             * Checks if the node contains `type="checkbox"`.
             *
             * @method checkbox
             * @return {Boolean}
             */
            checkbox: testNodeType('checkbox'),

            /**
             * Checks if the node is checked or not.
             *
             * @method checked
             * @param node
             * @return {Boolean}
             */
            checked: function(node) {
                return node.checked === true;
            },

            /**
             * Checks if the node is disabled or not.
             *
             * @method disabled
             * @param node
             * @return {Boolean}
             */
            disabled: function(node) {
                return node.disabled === true;
            },

            /**
             * Checks if the node is empty or not.
             *
             * @method empty
             * @param node
             * @return {Boolean}
             */
            empty: function(node) {
                return !node.firstChild;
            },

            /**
             * Checks if the node is enabled or not.
             *
             * @method enabled
             * @param node
             * @return {Boolean}
             */
            enabled: function(node) {
                return node.disabled === false && node.type !== 'hidden';
            },

            /**
             * Checks if the node contains `type="file"`.
             *
             * @method file
             * @return {Boolean}
             */
            file: testNodeType('file'),

            /**
             * Checks if the node is a header (e.g. `<h1>`, `<h2>`, ...) or not.
             *
             * @method header
             * @param node
             * @return {Boolean}
             */
            header: function(node) {
                return /h\d/i.test(node.nodeName);
            },

            /**
             * Checks if the node is hidden or not.
             *
             * @method hidden
             * @param node
             * @return {Boolean}
             */
            hidden: function(node) {
                return SELECTOR._isNodeHidden(node);
            },

            /**
             * Checks if the node contains `type="image"`.
             *
             * @method image
             * @return {Boolean}
             */
            image: testNodeType('image'),

            /**
             * Checks if the node is an input (e.g. `<textarea>`, `<input>`, ...) or not.
             *
             * @method input
             * @param node
             * @return {Boolean}
             */
            input: function(node) {
                return /input|select|textarea|button/i.test(node.nodeName);
            },

            /**
             * Checks if the node contains a child or not.
             *
             * @method parent
             * @param node
             * @return {Boolean}
             */
            parent: function(node) {
                return !!node.firstChild;
            },

            /**
             * Checks if the node contains `type="password"`.
             *
             * @method password
             * @return {Boolean}
             */
            password: testNodeType('password'),

            /**
             * Checks if the node contains `type="radio"`.
             *
             * @method radio
             * @return {Boolean}
             */
            radio: testNodeType('radio'),

            /**
             * Checks if the node contains `type="reset"`.
             *
             * @method reset
             * @return {Boolean}
             */
            reset: testNodeType('reset'),

            /**
             * Checks if the node is selected or not.
             *
             * @method selected
             * @param node
             * @return {Boolean}
             */
            selected: function(node) {
                node.parentNode.selectedIndex;
                return node.selected === true;
            },

            /**
             * Checks if the node contains `type="submit"`.
             *
             * @method submit
             * @return {Boolean}
             */
            submit: testNodeType('submit'),

            /**
             * Checks if the node contains `type="text"`.
             *
             * @method text
             * @return {Boolean}
             */
            text: testNodeType('text'),

            /**
             * Checks if the node is visible or not.
             *
             * @method visible
             * @param node
             * @return {Boolean}
             */
            visible: function(node) {
                return !SELECTOR._isNodeHidden(node);
            }
        }
    );
}, '', {
    requires: ['selector-css3', 'selector-native']
});