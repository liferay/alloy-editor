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

        it('should assert the html value of the editor is the same as passed value on creating the instance', function() {
            assert.strictEqual(this.nativeEditor.editable().getHtml(), '<p><br></p>');
            assert.isTrue(this.nativeEditor.element.hasClass('ae-placeholder'));
        });

        it('should not change the html value after the editor is blurred when its value is empty', function() {
            this.nativeEditor.fire('blur');

            assert.strictEqual(this.nativeEditor.editable().getHtml(), '<p><br></p>');
            assert.isTrue(this.nativeEditor.element.hasClass('ae-placeholder'));

        });

        it('should keep the value when input is blurred and input has content', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'This input has content');

            this.nativeEditor.fire('blur');
            assert.strictEqual(this.nativeEditor.editable().getHtml(), 'This input has content');
            assert.isTrue(!this.nativeEditor.element.hasClass('ae-placeholder'));
        });
	});

}());