(function() {
    'use strict';

    var assert = chai.assert;

    var KEY_L = 76;

    describe('ae_selectionkeystrokes', function() {
        this.timeout(35000);

        before(function(done) {
            Utils.createCKEditor.call(this, done, {
                extraPlugins: 'ae_selectionkeystrokes',
                selectionKeystrokes: [{
                    keys: CKEDITOR.CTRL + KEY_L,
                    selection: 'foo'
                }]
            });
        });

        after(Utils.destroyCKEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should fire an editorInteraction change when pressing the configured keystroke', function() {
            var onEditorInteraction = sinon.spy();

            this.nativeEditor.on('editorInteraction', onEditorInteraction);

            happen.keydown(this._editable, {
                ctrlKey: true,
                keyCode: KEY_L
            });

            assert.ok(onEditorInteraction.calledOnce);
            assert.strictEqual(onEditorInteraction.getCall(0).args[0].data.manualSelection, 'foo');
        });
    });
}());