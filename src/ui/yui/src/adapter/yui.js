CKEDITOR.disableAutoInline = true;

YUI.add('alloy-editor', function(Y) {
    'use strict';

    var Lang = Y.Lang,
        AlloyEditor;

    /**
     * YUI3 Adapter for CKEditor. This class provides YUI3 like way of creating instances of
     * CKEditor and passing configuration paramters to it.
     *
     * @class AlloyEditor
     * @constructor
     */
    AlloyEditor = Y.Base.create('alloyEditor', Y.Base, [], {

        /**
         * Initializer lifecycle implementation for the AlloyEditor class. Creates a CKEditor
         * instace, passing it the provided configuration attributes.
         *
         * @method initializer
         * @protected
         * @param config {Object} Configuration object literal for the editor.
         */
        initializer: function(config) {
            var editor;

            editor = CKEDITOR.inline(this.get('srcNode').getDOMNode());

            editor.config.allowedContent = this.get('allowedContent');

            editor.config.toolbars = this.get('toolbars');

            editor.config.removePlugins = this.get('removePlugins');
            editor.config.extraPlugins = this.get('extraPlugins');
            editor.config.placeholderClass = this.get('placeholderClass');
            editor.config.title = false;

            Y.mix(editor.config, config);

            this._editor = editor;
        },

        /**
         * Destructor lifecycle implementation for the AlloyEdtor class. Destroys the CKEditor
         * instance and destroys all created toolbars.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            var inst;

            inst = CKEDITOR.instances[this.get('srcNode').get('id')];

            if (inst) {
                Y.Object.each(inst.config.toolbars, function(value) {
                    value.destroy();
                });

                inst.destroy();
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
         * Validates the allowed content attribute. Look [here](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent) for more information about the supported values.
         *
         * @method _validateAllowedContent
         * @protected
         * @return {Boolean} True if the value was accepted, false otherwise.
         */
        _validateAllowedContent: function(value) {
            return Lang.isString(value) || Lang.isObject(value) || Lang.isBoolean(value);
        },

        /**
         * Validates toolbars attribute. May be empty string or null, which means the current instance of AlloyEdtor shouldn't
         * have any toolbars, or Object, which properties are the desired toolbars.
         *
         * @method _validateToolbars
         * @protected
         * @param {Any} value The value which should be validated.
         * @return {Boolean} True if the value was accepted, false otherwise.
         */
        _validateToolbars: function(value) {
            return (value === '' || Lang.isObject(value) || Lang.isNull(value));
        }
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
             * However, if you decide to go with the OOTB version of CKEditor, you will have to remove some of the plugins
             * if you decide to use AlloyEditor. Keep in mind that removing these plugins doesn't remove them entirely
             * from CKEditor. It just removes them from its current instance, in which you will use different UI - those of
             * AlloyEditor. You will be fully able to use both OOTB CKEditor and AlloyEditor on the same page!
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
                setter: Y.one,
                writeOnce: true
            },

            /**
             * Specifies the Toolbars of the current editor instance. The value should be an object
             * with one or more properties. Each of these will represent a toolbar. The value of these properties
             * can be string or Object. If String, the value of the string should represent the buttons. If object,
             * one of these properties should be 'buttons', which will represent the buttons of this Toolbar and
             * all the other properties will be different configuration parameters of the Toolbar. Example:
             * <pre><code>
             *     toolbars: {
             *         table: { // this would be a toolbar configuration, which specifies both Toolbar attributes and its buttons
             *             buttons: ['button1', button2],
             *             width: 25
             *         },
             *         add: ['image', 'code'], // here we specify only the buttons of this toolbar and leave the other options unmodified.
             *         image: ['left', 'right'],
             *         styles: ['strong', 'em', 'u', 'h1', 'h2', 'a', 'twitter']
             *     }
             * </pre></code>
             *
             * @default
             *     toolbars {
             *         add: ['image', 'code'],
             *         image: ['left', 'right'],
             *         styles: ['strong', 'em', 'u', 'h1', 'h2', 'a', 'twitter']
             *     }
             * @attribute toolbars
             * @type Object
             */
            toolbars: {
                validator: '_validateToolbars',
                value: {
                    add: ['image', 'code'],
                    image: ['left', 'right'],
                    styles: ['strong', 'em', 'u', 'h1', 'h2', 'a', 'twitter']
                }
            }
        }
    });

    Y.AlloyEditor = AlloyEditor;
}, '', {
    requires: ['base-build', 'node-base']
});