CKEDITOR.disableAutoInline = true;

YUI.add('alloy-editor', function (Y) {
    'use strict';

    var Lang = Y.Lang,
        AlloyEditor;

    AlloyEditor = Y.Base.create('alloyEditor', Y.Base, [], {
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

        _getNativeEditor: function() {
            return this._editor;
        },

        _validateAllowedContent: function(value) {
            return Lang.isString(value) || Lang.isObject(value) || Lang.isBoolean(value);
        },

        _validateToolbars: function(value) {
            return (value === '' || Lang.isObject(value) || Lang.isNull(value));
        }
    },
    {
        ATTRS: {
            allowedContent: {
                validator: '_validateAllowedContent',
                value: true,
                writeOnce: true
            },

            nativeEditor: {
                getter: '_getNativeEditor',
                readOnly: true
            },

            extraPlugins: {
                validator: Lang.isString,
                value: 'uicore,selectionregion,dropimages,placeholder,linktooltip,uiloader',
                writeOnce: true
            },

            placeholderClass: {
                validator: Lang.isString,
                value: 'alloy-editor-placeholder',
                writeOnce: true
            },

            removePlugins: {
                validator: Lang.isString,
                value: 'contextmenu,toolbar,elementspath,resize,liststyle,tabletools,link',
                writeOnce: true
            },

            srcNode: {
                setter: Y.one
            },

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
},'', {
    requires: ['base-build', 'node-base']
});