(function() {
	'use strict';

	var assert = chai.assert;

	describe.only('Placeholder', function() {
		this.timeout(35000);

		before(function(done) {
            Utils.createCKEditor.call(this, done, {extraPlugins: 'ae_placeholder'});
        });

        after(Utils.destroyCKEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should placeholder appear when input is empty', function() {
            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual('<p>', data);
        });
	});

}());