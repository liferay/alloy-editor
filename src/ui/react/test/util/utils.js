(function() {
    'use strict';

    var Utils = {
        afterEach: function(done) {
            Utils.removeContainer.call(this);

            bender.tools.selection.setWithHtml(this.nativeEditor, '');

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
            var self = this;

            var editable = document.createElement('div');

            editable.setAttribute('id', 'editable');
            editable.setAttribute('contenteditable', true);

            document.getElementsByTagName('body')[0].appendChild(editable);

            assert.ok(bender);
            assert.ok(CKEDITOR);
            assert.ok(AlloyEditor);

            config = CKEDITOR.tools.merge({
                toolbars: {},
                srcNode: 'editable'
            }, config);

            self.editor = new AlloyEditor(config);

            self.nativeEditor = self.editor.get('nativeEditor');

            self.nativeEditor.on('instanceReady', function() {
                self.nativeEditor.focus();

                done();
            });
        },

        createContainer: function() {
            this.container = document.createElement('div');

            document.body.appendChild(this.container);
        },

        destroyAlloyEditor: function(done) {
            var self = this;

            if (self.editor) {
                self.editor.destroy();
            }

            document.body.innerHTML = '';

            if (done) {
                done();
            }
        },

        removeContainer: function() {
            document.body.removeChild(this.container);
        }
    };

    window.Utils = Utils;
}());