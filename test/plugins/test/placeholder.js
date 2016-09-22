(function() {
	'use strict';

	var assert = chai.assert;

	describe('Placeholder', function() {
		this.timeout(35000);

		before(function(done) {
            Utils.createCKEditor.call(this, done, {extraPlugins: 'ae_placeholder', placeholderClass: 'ae-placeholder'}, {'data-placeholder': 'This is placeholder'});
        });

        after(Utils.destroyCKEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should html value of content editor is the value when instance is created', function() {
            assert.strictEqual(this.nativeEditor.editable().getHtml(), '<p><br></p>');
            assert.isTrue(this.nativeEditor.element.hasClass('ae-placeholder'));
        });

        it('should html value of content editor is not changed after it is blur when its value is empty', function() {
            this.nativeEditor.fire('blur');

            assert.strictEqual(this.nativeEditor.editable().getHtml(), '<p><br></p>');
            assert.isTrue(this.nativeEditor.element.hasClass('ae-placeholder'));

        });
	});

}());