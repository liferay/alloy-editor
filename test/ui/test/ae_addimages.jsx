var assert = chai.assert;

describe('Plugin ae_addimages', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should not throw error in case of missing `clipboardData.items` property', function() {
		assert.doesNotThrow(
			this.nativeEditor.plugins.ae_addimages._onPaste.bind(null, {})
		);
	});
});
