var assert = chai.assert;

var skipTestIE = function() {
	if (CKEDITOR.env.ie) {
		this.skip();
	}
};

describe('imageScaleResize', function() {
	var url = 'http://localhost/url_test';

	before(function() {
		skipTestIE.call(this);
	});

	describe('with the default value "both"', function() {
		beforeEach(function(done) {
			Utils.createCKEditor.call(this, done, {
				extraPlugins: 'ae_dragresize',
			});
		});

		afterEach(Utils.destroyCKEditor);

		it('should have 8 resize handlers', function() {
			bender.tools.selection.setWithHtml(
				this.nativeEditor,
				'Test image dragresize plugin {<img src="url_test" />} here.'
			);

			var handlers = document.getElementsByTagName('i');

			assert.strictEqual(handlers.length, 8);
		});

		it('should set backgroundImage url equal to the src of the img when mousedown is fired', function(done) {
			bender.tools.selection.setWithHtml(
				this.nativeEditor,
				'Test image dragresize plugin {<img src="' + url + '" />} here.'
			);

			var handlers = document.getElementsByTagName('i');

			happen.mousedown(handlers[0]);

			setTimeout(
				function() {
					var span = document.getElementsByTagName('span')[0];

					assert.strictEqual(
						'url("' + url + '")',
						span.style.backgroundImage
					);

					done();
				}.bind(this),
				0
			);
		});
	});

	describe('with the value "scale', function() {
		beforeEach(function(done) {
			Utils.createCKEditor.call(this, done, {
				extraPlugins: 'ae_dragresize',
				imageScaleResize: 'scale',
			});
		});

		afterEach(Utils.destroyCKEditor);

		it('should have 4 handlers', function() {
			bender.tools.selection.setWithHtml(
				this.nativeEditor,
				'Test image dragresize plugin {<img src="' + url + '" />} here.'
			);

			var handlers = document.getElementsByTagName('i');

			assert.strictEqual(handlers.length, 4);
		});
	});

	describe('with the value "width"', function() {
		beforeEach(function(done) {
			Utils.createCKEditor.call(this, done, {
				extraPlugins: 'ae_dragresize',
				imageScaleResize: 'width',
			});
		});

		afterEach(Utils.destroyCKEditor);

		it('should have 6 handlers', function() {
			bender.tools.selection.setWithHtml(
				this.nativeEditor,
				'Test image dragresize plugin {<img src="' + url + '" />} here.'
			);

			var handlers = document.getElementsByTagName('i');

			assert.strictEqual(handlers.length, 6);
		});
	});

	describe('with the value "height"', function() {
		beforeEach(function(done) {
			Utils.createCKEditor.call(this, done, {
				extraPlugins: 'ae_dragresize',
				imageScaleResize: 'height',
			});
		});

		afterEach(Utils.destroyCKEditor);

		it('should have 6 handlers', function() {
			bender.tools.selection.setWithHtml(
				this.nativeEditor,
				'Test image dragresize plugin {<img src="' + url + '" />} here.'
			);

			var handlers = document.getElementsByTagName('i');

			assert.strictEqual(handlers.length, 6);
		});
	});
});
