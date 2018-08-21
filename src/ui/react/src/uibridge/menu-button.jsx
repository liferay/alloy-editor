(function() {
    'use strict';

    /* istanbul ignore if */
    if (CKEDITOR.plugins.get('ae_menubuttonbridge')) {
        return;
    }

    /* istanbul ignore next */
    function noop() {}

    // API not yet implemented inside the menubutton bridge. By mocking the unsupported methods, we
    // prevent plugins from crashing if they make use of them.
    //
    // Some methods like `getState` and `setState` clash with React's own state methods. For them,
    // unsupported means that we don't account for the different meaning in the passed or returned
    // arguments.
    var UNSUPPORTED_MENUBUTTON_API = {
        //getState: function() {},
        //setState: function(state) {},
        toFeature: noop
    };

    var MENUBUTTON_DEFS = {};

    /**
     * Generates a MenuButtonBridge React class for a given menuButton definition if it has not been
     * already created based on the button name and definition.
     *
     * @private
     * @method generateMenuButtonBridge
     * @param {String} menuButtonName The menuButton's name
     * @param {Object} menuButtonDefinition The menuButton's definition
     * @return {Object} The generated or already existing React MenuButton Class
     */
    function generateMenuButtonBridge(menuButtonName, menuButtonDefinition, editor) {
        var MenuButtonBridge = AlloyEditor.Buttons[menuButtonName];

        MENUBUTTON_DEFS[editor.name] = MENUBUTTON_DEFS[editor.name] || {};
        MENUBUTTON_DEFS[editor.name][menuButtonName] = MENUBUTTON_DEFS[editor.name][menuButtonName] || menuButtonDefinition;

        if (!MenuButtonBridge) {
            MenuButtonBridge = createReactClass(
                CKEDITOR.tools.merge(UNSUPPORTED_MENUBUTTON_API, {
                    displayName: menuButtonName,

                    propTypes: {
                        editor: PropTypes.object.isRequired,
                        tabIndex: PropTypes.number
                    },

                    statics: {
                        key: menuButtonName
                    },

                    render: function() {
                        var editor = this.props.editor.get('nativeEditor');

                        var panelMenuButtonDisplayName = MENUBUTTON_DEFS[editor.name][menuButtonName].name || MENUBUTTON_DEFS[editor.name][menuButtonName].command || menuButtonName;

                        var buttonClassName = 'ae-button ae-button-bridge';

                        var iconClassName = 'ae-icon-' + panelMenuButtonDisplayName;

                        var iconStyle = {};

                        var cssStyle = CKEDITOR.skin.getIconStyle(panelMenuButtonDisplayName);

                        if (cssStyle) {
                            var cssStyleParts = cssStyle.split(';');

                            iconStyle.backgroundImage = cssStyleParts[0].substring(cssStyleParts[0].indexOf(':') + 1);
                            iconStyle.backgroundPosition = cssStyleParts[1].substring(cssStyleParts[1].indexOf(':') + 1);
                            iconStyle.backgroundSize = cssStyleParts[2].substring(cssStyleParts[2].indexOf(':') + 1);
                        }

                        var menu;

                        if (this.props.expanded) {
                            menu = this._getMenu();
                        }

                        return (
                            <div className="ae-container ae-has-dropdown">
                                <button aria-expanded={this.props.expanded} aria-label={MENUBUTTON_DEFS[editor.name][menuButtonName].label} className={buttonClassName} onClick={this.props.toggleDropdown} role="combobox" tabIndex={this.props.tabIndex} title={MENUBUTTON_DEFS[editor.name][menuButtonName].label}>
                                    <span className={iconClassName} style={iconStyle}></span>
                                </button>
                                {menu}
                            </div>
                        );
                    },

                    _getMenu: function() {
                        return (
                            <AlloyEditor.ButtonDropdown onDismiss={this.props.toggleDropdown}>
                                {this._getMenuItems()}
                            </AlloyEditor.ButtonDropdown>
                        );
                    },

                    _getMenuItems: function() {
                        var editor = this.props.editor.get('nativeEditor');
                        var items = menuButtonDefinition.onMenu();
                        var menuItems = Object.keys(items).map(function(key) {
                            var menuItem = editor.getMenuItem(key);

                            if (!menuItem) {
                                return null;
                            }

                            var menuItemDefinition = menuItem.definition || menuItem;
                            var menuItemState = items[key];

                            var className = 'ae-toolbar-element ' + (menuItemState === CKEDITOR.TRISTATE_ON ? 'active' : '');
                            var disabled = menuItemState === CKEDITOR.TRISTATE_DISABLED;
                            var onClick = function() {
                                if (menuItemDefinition.command) {
                                    editor.execCommand(menuItemDefinition.command);
                                } else if (menuItemDefinition.onClick) {
                                    menuItemDefinition.onClick.apply(menuItemDefinition);
                                }
                            };

                            return (
                                <li key={menuItem.name} role="option">
                                    <button className={className} disabled={disabled} onClick={onClick}>{menuItemDefinition.label}</button>
                                </li>
                            );
                        }.bind(this));

                        return menuItems;
                    }
                })
            );

            AlloyEditor.Buttons[menuButtonName] = MenuButtonBridge;
        }

        return MenuButtonBridge;
    }

    /* istanbul ignore else */
    if (!CKEDITOR.plugins.get('menubutton')) {
        CKEDITOR.UI_MENU_BUTTON = 'menubutton';

        CKEDITOR.plugins.add('menubutton', {});
    }

    /**
     * CKEditor plugin that bridges the support offered by CKEditor MenuButton plugin. It takes over the
     * responsibility of registering and creating menuButtons via:
     * - editor.ui.addMenuButton(name, definition)
     * - editor.ui.add(name, CKEDITOR.UI_MENUBUTTON, definition)
     *
     * @class CKEDITOR.plugins.ae_menubuttonbridge
     * @requires CKEDITOR.plugins.ae_uibridge
     * @requires CKEDITOR.plugins.ae_menubridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_menubuttonbridge', {
        requires: ['ae_uibridge', 'ae_menubridge'],

        /**
         * Set the add handler for UI_MENUBUTTON to our own. We do this in the init phase to override
         * the one in the native plugin in case it's present.
         *
         * @method init
         * @param {Object} editor The CKEditor instance being initialized
         */
        beforeInit: function(editor) {
            editor.ui.addMenuButton = function(menuButtonName, menuButtonDefinition) {
                this.add(menuButtonName, CKEDITOR.UI_MENUBUTTON, menuButtonDefinition);
            };

            editor.ui.addHandler(CKEDITOR.UI_MENUBUTTON, {
                add: generateMenuButtonBridge,
                create: function(menuButtonDefinition) {
                    var menuButtonName = 'buttonBridge' + ((Math.random() * 1e9) >>> 0);
                    var MenuButtonBridge = generateMenuButtonBridge(menuButtonName, menuButtonDefinition);

                    return new MenuButtonBridge();
                }
            });
        }
    });
}());