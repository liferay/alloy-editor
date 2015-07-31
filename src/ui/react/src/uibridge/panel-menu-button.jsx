(function() {
    'use strict';

    /* istanbul ignore if */
    if(CKEDITOR.plugins.get('ae_panelmenubuttonbridge')) {
        return;
    }

    /* istanbul ignore next */
    function noop() {}

    // API not yet implemented inside the panel menu button bridge. By mocking the unsupported methods, we
    // prevent plugins from crashing if they make use of them.
    var UNSUPPORTED_PANEL_MENU_BUTTON_API = {
        createPanel: noop
    };

    /**
     * Generates a PanelMenuButtonBridge React class for a given panelmenubutton definition if it has not been
     * already created based on the panelmenubutton name and definition.
     *
     * @private
     * @method generatePanelMenuButtonBridge
     * @param {String} panelMenuButtonName The panel button name
     * @param {Object} panelMenuButtonDefinition The panel button definition
     * @return {Object} The generated or already existing React PanelMenuButton Class
     */
    var generatePanelMenuButtonBridge = function(panelMenuButtonName, panelMenuButtonDefinition) {
        var PanelMenuButtonBridge = AlloyEditor.Buttons[panelMenuButtonName];

        if (!PanelMenuButtonBridge) {
            var panelMenuButtonDisplayName = panelMenuButtonDefinition.name || panelMenuButtonDefinition.command || buttonName;

            PanelMenuButtonBridge = React.createClass(
                CKEDITOR.tools.merge(UNSUPPORTED_PANEL_MENU_BUTTON_API, {
                    displayName: panelMenuButtonName,

                    propTypes: {
                        editor: React.PropTypes.object.isRequired
                    },

                    statics: {
                        key: panelMenuButtonName
                    },

                    render: function() {
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

                        var panel;

                        if (this.props.expanded) {
                            panel = this._getPanel();
                        }

                        return (
                            <div className="ae-container ae-has-dropdown">
                                <button aria-expanded={this.props.expanded} aria-label={panelMenuButtonDefinition.label} className={buttonClassName} onClick={this.props.toggleDropdown} role="combobox" tabIndex={this.props.tabIndex} title={panelMenuButtonDefinition.label}>
                                    <span className={iconClassName} style={iconStyle}></span>
                                </button>
                                {panel}
                            </div>
                        );
                    },

                    _getPanel: function() {
                        var panel = {
                            hide: this.props.toggleDropdown,
                            show: this.props.toggleDropdown
                        };

                        var blockElement = new CKEDITOR.dom.element('div');

                        var block = {
                            element: blockElement,
                            keys: {}
                        };

                        /* istanbul ignore else */
                        if (panelMenuButtonDefinition.onBlock) {
                            panelMenuButtonDefinition.onBlock.call(this, panel, block);
                        }

                        // TODO
                        // Use block.keys to configure the panel keyboard navigation

                        return (
                            <AlloyEditor.ButtonDropdown onDismiss={this.props.toggleDropdown}>
                                <div className={blockElement.getAttribute('class')} dangerouslySetInnerHTML={{__html: blockElement.getHtml()}} />
                            </AlloyEditor.ButtonDropdown>
                        );
                    }
                })
            );

            AlloyEditor.Buttons[panelMenuButtonName] = PanelMenuButtonBridge;
        }

        return PanelMenuButtonBridge;
    };

    /* istanbul ignore else */
    if (!CKEDITOR.plugins.get('panelmenubutton')) {
        CKEDITOR.UI_PANELBUTTON = 'panelmenubutton';

        CKEDITOR.plugins.add('panelmenubutton', {});
    }

    /**
     * CKEditor plugin that bridges the support offered by CKEditor PanelButton plugin. It takes over the
     * responsibility of registering and creating buttons via:
     * - editor.ui.addPanelMenuButton(name, definition)
     * - editor.ui.add(name, CKEDITOR.UI_PANELBUTTON, definition)
     *
     * @class CKEDITOR.plugins.ae_panelmenubuttonbridge
     * @requires CKEDITOR.plugins.ae_uibridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_panelmenubuttonbridge', {
        requires: ['ae_uibridge'],

        /**
         * Set the add handler for UI_PANELBUTTON to our own. We do this in the init phase to override
         * the one in the native plugin in case it's present
         *
         * @method init
         * @param {Object} editor The CKEditor instance being initialized
         */
        init: function(editor) {
            editor.ui.addPanelMenuButton = function(panelMenuButtonName, panelMenuButtonDefinition) {
                this.add(panelMenuButtonName, CKEDITOR.UI_PANELBUTTON, panelMenuButtonDefinition);
            };

            editor.ui.addHandler(CKEDITOR.UI_PANELBUTTON, {
                add: generatePanelMenuButtonBridge,
                create: function(panelMenuButtonDefinition) {
                    var panelMenuButtonName = 'panelMenuButtonBridge' + ((Math.random() * 1e9) >>> 0);
                    var PanelMenuButtonBridge = generatePanelMenuButtonBridge(panelMenuButtonName, panelMenuButtonDefinition);

                    return new PanelMenuButtonBridge();
                }
            });
        }
    });
}());