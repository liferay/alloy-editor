(function() {
    'use strict';

    var Utils = {
        afterEach: function(done) {
            Utils.removeContainer.call(this);

            this.nativeEditor.setData('');

            if (done) {
                done();
            }
        },

        beforeEach: function(done) {
            Utils.createContainer.call(this);

            if (done) {
                done();
            }
        },

        createAlloyEditor: function(done, config) {
            var editable = document.createElement('div');

            editable.setAttribute('id', 'editable');
            editable.setAttribute('contenteditable', true);

            document.getElementsByTagName('body')[0].appendChild(editable);

            this._editable = editable;

            assert.ok(bender);
            assert.ok(CKEDITOR);
            assert.ok(AlloyEditor);

            config = CKEDITOR.tools.merge({
                toolbars: {},
                srcNode: 'editable'
            }, config);

            this.editor = new AlloyEditor(config);

            this.nativeEditor = this.editor.get('nativeEditor');

            this.nativeEditor.on('instanceReady', function() {
                this.nativeEditor.focus();

                done();
            }.bind(this));
        },

        createContainer: function() {
            this.container = document.createElement('div');

            document.body.appendChild(this.container);
        },

        destroyAlloyEditor: function(done) {
            if (this.editor) {
                this.editor.destroy();
            }

            this._editable.parentNode.removeChild(this._editable);

            if (done) {
                done();
            }
        },

        removeContainer: function() {
            this.container.parentNode.removeChild(this.container);
        }
    };

    window.Utils = Utils;
}());