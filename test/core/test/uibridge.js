(function() {
    'use strict';

    var assert = chai.assert;

    var assertResult = Utils.assertResult('test/core/test/fixtures');
    var getFixture = Utils.getFixture('test/core/test/fixtures');

    describe.only('UIBridge', function() {
        this.timeout(35000);

        before(function (done) {
            Utils.createCKEditor.call(this, done, {
                extraPlugins: 'ae_richcombobridge,test_richcombobridge'
            });
        });

        after(Utils.destroyCKEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should return an array even for unregistered plugins', function() {
            var result = AlloyEditor.getButtonFor('nonexisting');

            assert.ok(Array.isArray(result));
            assert.strictEqual(result.length, 0);
        });

        it('should return an array with the name of the dependencies for registered plugins', function() {
            var result = AlloyEditor.getButtonFor('test_richcombobridge');

            assert.ok(Array.isArray(result));

            if (!CKEDITOR.env.ie || CKEDITOR.env.edge) {
                assert.strictEqual(result[0], 'ButtonRichCombo');
                assert.strictEqual(result.length, 1);
            } else {
                assert.strictEqual(result[0], undefined);
                assert.strictEqual(result.length, 0);
            }

        });

    });
}());