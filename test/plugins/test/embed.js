var assert = chai.assert;

function applyFirefoxHack(nativeEditor) {
	// Hack for Firefox.
	// If a contenteditable has been in the DOM before this test runs,
	// CKEDITOR will blow up on trying to insertHtml, unless we insert this
	// magical content (whitespace and an empty selection) first.
	bender.tools.selection.setWithHtml(nativeEditor, ' {}');
}

describe('Embed plugin', function() {
	beforeEach(function(done) {
		Utils.createCKEditor.call(this, done, {extraPlugins: 'ae_embed'});
	});

	afterEach(Utils.destroyCKEditor);

	it('should not convert links inside content', function() {
		var nativeEditor = this.nativeEditor;

		var spy = sinon.spy(nativeEditor, 'execCommand');

		bender.tools.selection.setWithHtml(
			nativeEditor,
			'There should be a {selection} here.'
		);

		nativeEditor.fire('paste', {
			dataValue: 'this a <a href="http://test"></a> test',
		});

		assert.isTrue(spy.notCalled);
	});

	it('should create embed content when url is pasted and its provider is Twitter', function() {
		var url = 'https://foo.com';

		var tweetReturnHtml =
			'<blockquote class="twitter-tweet" align="center">Hello Earth! Can you hear me?</blockquote>';

		sinon
			.stub(CKEDITOR.tools, 'jsonp')
			.callsFake(function(fn, data, success, fail) {
				success({html: tweetReturnHtml, provider_name: 'Twitter'});
			});

		var nativeEditor = this.nativeEditor;

		applyFirefoxHack(nativeEditor);

		nativeEditor.fire('paste', {
			dataValue: url,
		});

		assert.strictEqual(
			nativeEditor.getData(),
			'<div data-ae-embed-url="' + url + '">' + tweetReturnHtml + '</div>'
		);
	});

	it('should create embed content when url is pasted and its provider is YouTube', function() {
		var url = 'https://foo.com';

		var tweetReturnHtml =
			'<blockquote class="twitter-tweet" align="center">Hello Earth! Can you hear me?</blockquote>';

		sinon
			.stub(CKEDITOR.tools, 'jsonp')
			.callsFake(function(fn, data, success, fail) {
				success({html: tweetReturnHtml, provider_name: 'YouTube'});
			});

		var nativeEditor = this.nativeEditor;

		applyFirefoxHack(nativeEditor);

		nativeEditor.fire('paste', {
			dataValue: url,
		});

		assert.strictEqual(
			nativeEditor.getData(),
			'<div data-ae-embed-url="' + url + '">' + tweetReturnHtml + '</div>'
		);
	});

	it('should create embed content only with url when url is pasted and it is not into providers YouTube or Twitter', function() {
		var url = 'https://foo.com';

		var tweetReturnHtml =
			'<blockquote class="twitter-tweet" align="center">Hello Earth! Can you hear me?</blockquote>';

		sinon
			.stub(CKEDITOR.tools, 'jsonp')
			.callsFake(function(fn, data, success, fail) {
				success({
					html: tweetReturnHtml,
					provider_name: 'other_provider',
				});
			});

		var nativeEditor = this.nativeEditor;

		var isCalled = false;

		sinon.stub(nativeEditor, 'insertHtml').callsFake(function() {
			isCalled = true;
			return;
		});

		bender.tools.selection.setWithHtml(nativeEditor, '{}');

		nativeEditor.fire('paste', {
			dataValue: url,
		});

		assert.isTrue(isCalled);
	});

	it('should create a tag with url as href when url is pasted and there is a connection error', function() {
		var url = 'https://foo.com';

		sinon
			.stub(CKEDITOR.tools, 'jsonp')
			.callsFake(function(fn, data, success, fail) {
				fail({});
			});

		var nativeEditor = this.nativeEditor;

		var isCalled = false;

		sinon.stub(nativeEditor, 'insertHtml').callsFake(function() {
			isCalled = true;
			return;
		});

		bender.tools.selection.setWithHtml(nativeEditor, '{}');

		nativeEditor.fire('paste', {
			dataValue: url,
		});

		assert.isTrue(isCalled);
	});
});
