(function() {
    'use strict';

    var assert = chai.assert;

    describe('AlloyEditor', function() {
        this.timeout(35000);

        afterEach(function() {
            if (this.alloyEditor) {
                this.alloyEditor.destroy();
                this.alloyEditor = null;
            }

            document.body.removeChild(this.el);
        });

        beforeEach(function(done) {
            this.el = document.createElement('div');
            this.el.setAttribute('id', 'editable');
            document.body.appendChild(this.el);

            this.alloyEditor = AlloyEditor.editable('editable');

            this.alloyEditor.get('nativeEditor').once('instanceReady', function() {
                done();
            });
        });

        it('should set contenteditable to true when it is not set', function() {
            assert.strictEqual('true', this.el.getAttribute('contenteditable'));
        });

        it('should add ae-editable class to the editable element', function() {
            assert.isTrue(this.alloyEditor.get('nativeEditor').editable().hasClass('ae-editable'));
        });

        it('should remove ae-editable class from the editable element on editor destroying', function() {
            var editable = this.alloyEditor.get('nativeEditor').editable();
            this.alloyEditor.destroy();
            this.alloyEditor = null;
            assert.isFalse(editable.hasClass('ae-editable'));
        });

        it('should create an instance when the passed srcNode is a DOM element', function(done) {
            var el = document.createElement('div');
            el.setAttribute('id', 'editable1');
            document.body.appendChild(el);

            assert.doesNotThrow(function() {
                try {
                    var alloyEditor = AlloyEditor.editable(el);

                    alloyEditor.get('nativeEditor').on('instanceReady', function() {
                        alloyEditor.destroy();
                        done();
                    });
                } finally {
                    document.body.removeChild(el);
                }
            });
        });

        it('should create an instance when the passed srcNode is a string', function(done) {
            var el = document.createElement('div');
            el.setAttribute('id', 'editable1');
            document.body.appendChild(el);

            assert.doesNotThrow(function() {
                try {
                    var alloyEditor = AlloyEditor.editable('editable1');

                    alloyEditor.get('nativeEditor').on('instanceReady', function() {
                        alloyEditor.destroy();
                        done();
                    });
                } finally {
                    document.body.removeChild(el);
                }
            });
        });
    });
}());