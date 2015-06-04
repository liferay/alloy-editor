(function() {
    'use strict';

    var assert = chai.assert;

    describe('AlloyEditor', function() {
        this.timeout(35000);

        after(function() {
            document.body.removeChild(this.el);
        });

        afterEach(function() {
            if (this.alloyEditor) {
                this.alloyEditor.destroy();
            }
        });

        before(function() {
            this.el = document.createElement('div');
            this.el.setAttribute('id', 'editable');
            document.body.appendChild(this.el);
        });

        beforeEach(function(done) {
            this.alloyEditor = AlloyEditor.editable('editable');

            this.alloyEditor.get('nativeEditor').once('instanceReady', function() {
                done();
            });
        });

        it('should create an instance of AlloyEditor when contenteditable is not set', function() {
            assert.strictEqual('true', this.el.getAttribute('contenteditable'));
        });

        it('should add alloy-editor-editable class on the editable element', function() {
            assert.isTrue(this.alloyEditor.get('nativeEditor').editable().hasClass('alloy-editor-editable'));
        });

        it('should remove alloy-editor-editable class from the editable element on editor destroying', function(done) {
            var editable = this.alloyEditor.get('nativeEditor').editable();
            this.alloyEditor.destroy();
            this.alloyEditor = null;
            assert.isFalse(editable.hasClass('alloy-editor-editable'));
            done();
        });
    });
}());