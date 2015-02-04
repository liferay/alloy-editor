'use strict';

CKEDITOR.disableAutoInline = true;

var Lang = Y.Lang;

function AlloyEditor(config) {
    AlloyEditor.superclass.constructor.call(this, config);
}

OOP.extend(AlloyEditor, Base, {
    /**
     * Initializer lifecycle implementation for the AlloyEditor class. Creates a CKEditor
     * instace, passing it the provided configuration attributes.
     *
     * @method initializer
     * @protected
     * @param config {Object} Configuration object literal for the editor.
     */
    initializer: function(config) {
        var node = this.get('srcNode');

        var editor = CKEDITOR.inline(node);

        editor.config.allowedContent = this.get('allowedContent');

        editor.config.toolbars = this.get('toolbars');

        editor.config.removePlugins = this.get('removePlugins');
        editor.config.extraPlugins = this.get('extraPlugins');
        editor.config.placeholderClass = this.get('placeholderClass');

        editor.config.pasteFromWordRemoveStyles = false;
        editor.config.pasteFromWordRemoveFontStyles = false;

        Lang.mix(editor.config, config);

        this._editor = editor;

        var eventsDelay = this.get('eventsDelay');
    },

    /**
     * Destructor lifecycle implementation for the AlloyEdtor class. Destroys the CKEditor
     * instance and destroys all created toolbars.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        var editorInstance;

        editorInstance = CKEDITOR.instances[this.get('srcNode')];

        if (editorInstance) {
            Object.keys(editorInstance.config.toolbars).each(function(value) {
                value.destroy();
            });

            editorInstance.destroy();
        }
    },

    /**
     * Retrieves the native CKEditor instance. Having this, the developer may use the API of CKEditor OOTB.
     *
     * @method _getNativeEditor
     * @protected
     * @return {Object} The current instance of CKEditor.
     */
    _getNativeEditor: function() {
        return this._editor;
    },

    /**
     * Validates the allowed content attribute. Look
     * [here](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent) for more information about the
     * supported values.
     *
     * @method _validateAllowedContent
     * @protected
     * @return {Boolean} True if the value was accepted, false otherwise.
     */
    _validateAllowedContent: function(value) {
        return Lang.isString(value) || Lang.isObject(value) || Lang.isBoolean(value);
    },
}, {
    ATTRS: {
        /**
         * Configures the allowed content for the current instance of AlloyEditor.
         * Look on the [official CKEditor API](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent)
         * for more information about the valid values.
         *
         * @attribute allowedContent
         * @default true
         * @writeOnce
         * @type {Boolean, String, Object}
         */
        allowedContent: {
            validator: '_validateAllowedContent',
            value: true,
            writeOnce: true
        },

        /**
         * The delay (timeout), in ms, after which events such like key or mouse events will be processed.
         *
         * @attribute eventsDelay
         * @type {Number}
         */
        eventsDelay: {
            validator: Lang.isNumber,
            value: 100
        },

        /**
         * Specifies the extra plugins which have to be loaded to the current CKEditor instance in order to
         * make AlloyEditor to work properly.
         *
         * @attribute extraPlugins
         * @default 'uicore,selectionregion,dropimages,placeholder,linktooltip,uiloader'
         * @writeOnce
         * @type {String}
         */
        extraPlugins: {
            validator: Lang.isString,
            value: 'uicore,selectionregion,dropimages,placeholder,linktooltip,uiloader',
            writeOnce: true
        },

        /**
         * Retrieves the native CKEditor instance. Having this, the developer may use the full API of CKEditor.
         *
         * @attribute nativeEditor
         * @readOnly
         * @type {Object}
         */
        nativeEditor: {
            getter: '_getNativeEditor',
            readOnly: true
        },

        /**
         * Specifies the class, which should be added by Placeholder plugin
         * {{#crossLink "CKEDITOR.plugins.placeholder}}{{/crossLink}}
         * when editor is not focused.
         *
         * @attribute placeholderClass
         * @default 'alloy-editor-placeholder'
         * @writeOnce
         * @type {String}
         */
        placeholderClass: {
            validator: Lang.isString,
            value: 'alloy-editor-placeholder',
            writeOnce: true
        },

        /**
         * Specifies the plugins, which come by default with CKEditor, but which are not needed by AlloyEditor.
         * These plugins add the default UI for CKeditor, which is no more needed. Please note that AlloyEdtor
         * comes with its own highly optimized copy of CKEditor (just customized via their official download page).
         * This version does not come with the unneeded plugins, so the value of this property won't be needed.
         * However, if you decide to go with the OOTB version of CKEditor, you will have to remove some of the
         * plugins if you decide to use AlloyEditor. Keep in mind that removing these plugins doesn't remove them
         * entirely from CKEditor. It just removes them from its current instance, in which you will use different
         * UI - those of AlloyEditor. You will be fully able to use both OOTB CKEditor and AlloyEditor on the same
         * page!
         *
         * @attribute removePlugins
         * @default 'contextmenu,toolbar,elementspath,resize,liststyle,tabletools,link'
         * @writeOnce
         * @type {String}
         */
        removePlugins: {
            validator: Lang.isString,
            value: 'contextmenu,toolbar,elementspath,resize,liststyle,tabletools,link',
            writeOnce: true
        },

        /**
         * The Node ID or HTMl node, which should be turned to an instance of AlloyEditor.
         *
         * @attribute srcNode
         * @type String | Node
         * @writeOnce
         */
        srcNode: {
            writeOnce: true
        },

        /**
         * TODO: Explain the configuration below
         */
        toolbars: {
            value: {
                add: {
                    buttons: ['image']
                },
                styles: {
                    selections: [
                        {
                            name: 'text',
                            buttons: ['strong', 'em', 'u', 'h1', 'h2', 'a', 'twitter']
                        },
                        {
                            name: 'image',
                            buttons: ['imageLeft', 'imageRight']
                        }
                    ]
                }
            }
        }
    }
});