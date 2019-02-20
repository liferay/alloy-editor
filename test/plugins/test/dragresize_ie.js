var assert = chai.assert;

var Simulate = ReactTestUtils.Simulate;

var doTestIE = function() {
	if (!CKEDITOR.env.ie) {
		this.skip();
	}
	return;
};

describe('imageScaleResize on IE', function() {
	var url = 'http://localhost/url_test';

	before(function() {
		doTestIE.call(this);
	});

	describe('with the default value "both"', function() {
		beforeEach(function(done) {
			Utils.createCKEditor.call(this, done, {
				extraPlugins: 'ae_dragresize_ie',
			});
		});

		afterEach(Utils.destroyCKEditor);

		it('should have imageScaleResize value as default "both"', function() {
			assert.strictEqual(
				this.nativeEditor.config.imageScaleResize,
				'both'
			);
		});

		it('should set data-widget to the image', function() {
			bender.tools.selection.setWithHtml(
				this.nativeEditor,
				'<p>Test image dragresize plugin {<img alt="" id="image" src="http://21stcenturywaves.com/wp-content/uploads/2009/07/fullmoon.thumbnail.jpg" />} here.</p>'
			);

			var el = new CKEDITOR.dom.element(document.getElementById('image'));

			this.nativeEditor.widgets.initOn(el, 'image');

			assert.strictEqual(el.getAttribute('data-widget'), 'image');
		});

		it('should have span to resize image with cursor nwse-resize', function() {
			bender.tools.selection.setWithHtml(
				this.nativeEditor,
				'<p>Test image dragresize plugin {<img alt="" id="image" src="http://21stcenturywaves.com/wp-content/uploads/2009/07/fullmoon.thumbnail.jpg" />} here.</p>'
			);

			var el = new CKEDITOR.dom.element(document.getElementById('image'));

			this.nativeEditor.widgets.initOn(el, 'image');

			var span = document.getElementsByClassName(
				'cke_image_resizer_nwse-resize'
			)[0];

			assert(span);
		});
	});

	describe('with height value', function() {
		beforeEach(function(done) {
			Utils.createCKEditor.call(this, done, {
				extraPlugins: 'ae_dragresize_ie',
				imageScaleResize: 'height',
			});
		});

		afterEach(Utils.destroyCKEditor);

		it('should have span to resize image with cursor ns-resize', function() {
			bender.tools.selection.setWithHtml(
				this.nativeEditor,
				'<p>Test image dragresize plugin {<img alt="" id="image" src="http://21stcenturywaves.com/wp-content/uploads/2009/07/fullmoon.thumbnail.jpg" />} here.</p>'
			);

			var el = new CKEDITOR.dom.element(document.getElementById('image'));

			this.nativeEditor.widgets.initOn(el, 'image');

			var span = document.getElementsByClassName(
				'cke_image_resizer_ns-resize'
			)[0];

			assert(span);
		});
	});

	describe('with scale value', function() {
		beforeEach(function(done) {
			Utils.createCKEditor.call(this, done, {
				extraPlugins: 'ae_dragresize_ie',
				imageScaleResize: 'scale',
			});
		});

		afterEach(Utils.destroyCKEditor);

		it('should have span to resize image with cursor nwse-resize', function() {
			bender.tools.selection.setWithHtml(
				this.nativeEditor,
				'<p>Test image dragresize plugin {<img alt="" id="image" src="http://21stcenturywaves.com/wp-content/uploads/2009/07/fullmoon.thumbnail.jpg" />} here.</p>'
			);

			var el = new CKEDITOR.dom.element(document.getElementById('image'));

			this.nativeEditor.widgets.initOn(el, 'image');

			var span = document.getElementsByClassName(
				'cke_image_resizer_nwse-resize'
			)[0];

			assert(span);
		});
	});

	describe('with width value', function() {
		beforeEach(function(done) {
			Utils.createCKEditor.call(this, done, {
				extraPlugins: 'ae_dragresize_ie',
				imageScaleResize: 'width',
			});
		});

		afterEach(Utils.destroyCKEditor);

		it('should have span to resize image with cursor ew-resize', function() {
			bender.tools.selection.setWithHtml(
				this.nativeEditor,
				'<p>Test image dragresize plugin {<img alt="" id="image" src="http://21stcenturywaves.com/wp-content/uploads/2009/07/fullmoon.thumbnail.jpg" />} here.</p>'
			);

			var el = new CKEDITOR.dom.element(document.getElementById('image'));

			this.nativeEditor.widgets.initOn(el, 'image');

			var span = document.getElementsByClassName(
				'cke_image_resizer_ew-resize'
			)[0];

			assert(span);
		});
	});
});
