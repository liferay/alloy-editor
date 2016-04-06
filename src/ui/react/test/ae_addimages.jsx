(function(){
	'use strict';

	var assert = chai.assert;

	describe('Plugin ae_addimages', function () {
		this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

		afterEach(Utils.afterEach);

		it('Paste checks that it does not produce JS error', function () {
   			assert.doesNotThrow(this.nativeEditor.plugins.ae_addimages._onPaste.bind(null, {}, 'It does not produce JS error'));
		});
	});
}());