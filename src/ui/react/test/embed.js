(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('Embed', function() {
        this.timeout(35000);

        beforeEach(Utils.createAlloyEditor);

        afterEach(Utils.destroyAlloyEditor);

        it('should not convert links inside content', function() {
        	this.nativeEditor.execCommand = sinon.stub();
            this.nativeEditor.pasteFilter = null;

            this.nativeEditor.fire('paste', {
                dataValue: 'this a <a href="http://test"></a> test'
            });

            assert.isTrue(this.nativeEditor.execCommand.notCalled);
        });
    });
}());