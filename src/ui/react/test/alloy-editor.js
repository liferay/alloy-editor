(function() {
    'use strict';

    var assert = chai.assert;

    describe('AlloyEditor', function() {
        this.timeout(35000);

        it('should create an instance of AlloyEditor when contenteditable is not set', function(done) {
            var el = document.createElement('div');
            el.setAttribute('id', 'editable');
            document.body.appendChild(el);

            var alloyEditor = AlloyEditor.editable('editable');

            alloyEditor.get('nativeEditor').on('instanceReady', function() {
                alloyEditor.destroy();
                document.body.removeChild(el);
                done();
            });

            assert.strictEqual('true', el.getAttribute('contenteditable'));
        });
    });
}());