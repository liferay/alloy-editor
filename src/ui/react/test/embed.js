(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('Embed', function() {
        this.timeout(35000);

        var cleanUpEditor = function() {
            if (this.alloyEditor) {
                this.alloyEditor.destroy();
                this.alloyEditor = null;
            }

            this.el.parentNode.removeChild(this.el);
        };

        var initEditor = function(done, config) {
            this.el = document.createElement('div');
            this.el.setAttribute('id', 'editable');
            document.body.appendChild(this.el);

            this.alloyEditor = AlloyEditor.editable('editable', config);

            this.alloyEditor.get('nativeEditor').once('instanceReady', function() {
                done();
            });
        };

        beforeEach(function(done) {
            initEditor.call(this, done, {
                allowedContent: true
            });
        });

        afterEach(function() {
            cleanUpEditor.call(this);
        });

        it('should not convert links inside content', function() {
            var nativeEditor = this.alloyEditor.get('nativeEditor');
            bender.tools.selection.setWithHtml(nativeEditor, 'There should be a {selection} here.');

            nativeEditor.execCommand = sinon.stub();

            nativeEditor.fire('paste', {
                dataValue: 'this a <a href="http://test"></a> test'
            });

            assert.isTrue(nativeEditor.execCommand.notCalled);
        });
    });
}());