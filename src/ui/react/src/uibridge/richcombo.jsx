(function() {
    'use strict';

    /* istanbul ignore if */
    if (CKEDITOR.plugins.get('ae_richcombobridge')) {
        return;
    }

    /* istanbul ignore next */
    function noop() {}

    // API not yet implemented inside the richcombo bridge. By mocking the unsupported methods, we
    // prevent plugins from crashing if they make use of them.
    //
    // Some methods like `setState` clash with React's own state methods. For them, unsupported means
    // that we don't account for the different meaning in the passed or returned arguments.
    var UNSUPPORTED_RICHCOMBO_API = {
        commit: noop,
        createPanel: noop,
        disable: noop,
        enable: noop,
        getState: noop,
        hideGroup: noop,
        hideItem: noop,
        mark: noop,
        //setState: noop,
        showAll: noop,
        startGroup: noop,
        unmarkAll: noop
    };

    var RICH_COMBO_DEFS = {};

    /**
     * Generates a RichComboBridge React class for a given richcombo definition if it has not been
     * already created based on the richcombo name and definition.
     *
     * @method generateRichComboBridge
     * @private
     * @param {String} richComboName The rich combo name
     * @param {Object} richComboDefinition The rich combo definition
     * @return {Object} The generated or already existing React RichCombo Class
     */
    var generateRichComboBridge = function(richComboName, richComboDefinition, editor) {
        var RichComboBridge = AlloyEditor.Buttons[richComboName];

        RICH_COMBO_DEFS[editor.name] = RICH_COMBO_DEFS[editor.name] || {};
        RICH_COMBO_DEFS[editor.name][richComboName] = RICH_COMBO_DEFS[editor.name][richComboName] || richComboDefinition;
        RICH_COMBO_DEFS[editor.name][richComboName].currentValue = undefined;

        if (!RichComboBridge) {
            RichComboBridge = createReactClass(
                CKEDITOR.tools.merge(UNSUPPORTED_RICHCOMBO_API, {
                    displayName: richComboName,

                    propTypes: {
                        editor: PropTypes.object.isRequired
                    },

                    statics: {
                        key: richComboName
                    },

                    add: function(value, preview, title) {
                        this._items.push({
                            preview: preview,
                            title: title,
                            value: value
                        });
                    },

                    componentWillMount: function () {
                        var editor = this.props.editor.get('nativeEditor');

                        var editorCombo = RICH_COMBO_DEFS[editor.name][richComboName];

                        this._items = [];

                        this.setValue = this._setValue;

                        if (editorCombo.init) {
                            editorCombo.init.call(this);
                        }

                        if (editorCombo.onRender) {
                            editorCombo.onRender.call(this);
                        }
                    },

                    componentWillUnmount: function () {
                        this._cacheValue(this.state.value);

                        this.setValue = this._cacheValue;
                    },

                    getInitialState: function() {
                        return {
                            value: RICH_COMBO_DEFS[editor.name][richComboName].currentValue
                        };
                    },

                    getValue: function() {
                        return this.state.value;
                    },

                    render: function() {
                        var editor = this.props.editor.get('nativeEditor');

                        var richComboLabel = RICH_COMBO_DEFS[editor.name][richComboName].currentValue || richComboDefinition.label;

                        var itemsList;

                        if (this.props.expanded) {
                            itemsList = this._getItemsList();
                        }

                        return (
                            <div className="ae-container-dropdown ae-has-dropdown">
                                <button aria-expanded={this.props.expanded} aria-label={richComboLabel} className="ae-toolbar-element" onClick={this.props.toggleDropdown} role="combobox" tabIndex={this.props.tabIndex} title={richComboLabel}>
                                    <div className="ae-container">
                                        <span className="ae-container-dropdown-selected-item">{richComboLabel}</span>
                                        <span className="ae-icon-arrow"></span>
                                    </div>
                                </button>
                                {itemsList}
                            </div>
                        );
                    },

                    _cacheValue: function(value) {
                        var editor = this.props.editor.get('nativeEditor');

                        RICH_COMBO_DEFS[editor.name][richComboName].currentValue = value;
                    },

                    _getItems: function() {
                        var richCombo = this;

                        var items = this._items.map(function(item) {

                            var className = 'ae-toolbar-element ' + (item.value === this.state.value ? 'active' : '');

                            return (
                                <li key={item.title} role="option">
                                    <button className={className} dangerouslySetInnerHTML={{__html: item.preview}} data-value={item.value} onClick={richCombo._onClick}></button>
                                </li>
                            );
                        }.bind(this));

                        return items;
                    },

                    _getItemsList: function() {
                        return (
                            <AlloyEditor.ButtonDropdown onDismiss={this.props.toggleDropdown}>
                                {this._getItems()}
                            </AlloyEditor.ButtonDropdown>
                        );
                    },

                    _onClick: function(event) {
                        var editor = this.props.editor.get('nativeEditor');

                        var editorCombo = RICH_COMBO_DEFS[editor.name][richComboName];

                        if (editorCombo.onClick) {
                            var newValue = event.currentTarget.getAttribute('data-value');

                            editorCombo.onClick.call(this, newValue);

                            RICH_COMBO_DEFS[editor.name][richComboName].currentValue = newValue;

                            editor.fire('actionPerformed', this);
                        }
                    },

                    _setValue: function(value) {
                        this._cacheValue(value);

                        this.setState({
                            value: value
                        });
                    }
                })
            );

            AlloyEditor.Buttons[richComboName] = RichComboBridge;
        }

        return RichComboBridge;
    };

    /* istanbul ignore else */
    if (!CKEDITOR.plugins.get('richcombo')) {
        CKEDITOR.UI_RICHCOMBO = 'richcombo';

        CKEDITOR.plugins.add('richcombo', {});
    }

    /**
     * CKEditor plugin that bridges the support offered by CKEditor RichCombo plugin. It takes over the
     * responsibility of registering and creating rich combo elements via:
     * - editor.ui.addRichCombo(name, definition)
     * - editor.ui.add(name, CKEDITOR.UI_RICHCOMBO, definition)
     *
     * @class CKEDITOR.plugins.ae_richcombobridge
     * @requires CKEDITOR.plugins.ae_uibridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_richcombobridge', {
        requires: ['ae_uibridge'],

        /**
         * Set the add handler for UI_RICHCOMBO to our own. We do this in the init phase to override
         * the one in the original plugin in case it's present
         *
         * @method init
         * @param {Object} editor The CKEditor instance being initialized
         */
        beforeInit: function(editor) {
            editor.ui.addRichCombo = function(richComboName, richComboDefinition) {
                this.add(richComboName, CKEDITOR.UI_RICHCOMBO, richComboDefinition);
            };

            editor.ui.addHandler(CKEDITOR.UI_RICHCOMBO, {
                add: generateRichComboBridge,
                create: function(richComboDefinition) {
                    var richComboName = 'richComboBridge' + ((Math.random() * 1e9) >>> 0);
                    var RichComboBridge = generateRichComboBridge(richComboName, richComboDefinition);

                    return new RichComboBridge();
                }
            });
        }
    });
}());