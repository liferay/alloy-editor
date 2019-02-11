var assert = chai.assert;

describe('Plugin ae_addimages', function() {
	before(Utils.createAlloyEditor);

	after(Utils.destroyAlloyEditor);

	beforeEach(Utils.beforeEach);

	afterEach(Utils.afterEach);

	it('should not throw error in case of missing `clipboardData.items` property', function() {
		assert.doesNotThrow(
			this.nativeEditor.plugins.ae_addimages._onPaste.bind(null, {})
		);
	});
});
