var assert = chai.assert;

var KEY_BACK = 8;

var KEY_COMMA = 188;

var KEY_ENTER = 13;

var KEY_SEMICOLON = 186;

var KEY_SPACE = 32;

describe('AutoLink', function() {
	beforeEach(function(done) {
		Utils.createCKEditor.call(this, done, {
			extraPlugins: 'ae_autolink',
		});
	});

	afterEach(Utils.destroyCKEditor);

	it('should create a link when pressing SPACE', function() {
		testLink.call(this, {
			expected:
				'<p>link <a href="http://www.liferay.com" rel="noopener noreferrer">www.liferay.com</a></p>',
			html: '<p>link www.liferay.com { }</p>',
			keyCode: KEY_SPACE,
		});

		testLink.call(this, {
			expected:
				'<p>link <a href="http://www.liferay.com" rel="noopener noreferrer">www.liferay.com</a> text</p>',
			html: '<p>link www.liferay.com { }text</p>',
			keyCode: KEY_SPACE,
		});
	});

	it('should create a link when pressing COMMA', function() {
		testLink.call(this, {
			expected:
				'<p>link <a href="http://www.liferay.com" rel="noopener noreferrer">www.liferay.com</a></p>',
			html: '<p>link www.liferay.com { }</p>',
			keyCode: KEY_COMMA,
		});

		testLink.call(this, {
			expected:
				'<p>link <a href="http://www.liferay.com" rel="noopener noreferrer">www.liferay.com</a> text</p>',
			html: '<p>link www.liferay.com { }text</p>',
			keyCode: KEY_COMMA,
		});
	});

	it('should create a link when pressing SEMICOLON', function() {
		testLink.call(this, {
			expected:
				'<p>link <a href="http://www.liferay.com" rel="noopener noreferrer">www.liferay.com</a></p>',
			html: '<p>link www.liferay.com { }</p>',
			keyCode: KEY_SEMICOLON,
		});

		testLink.call(this, {
			expected:
				'<p>link <a href="http://www.liferay.com" rel="noopener noreferrer">www.liferay.com</a> text</p>',
			html: '<p>link www.liferay.com { }text</p>',
			keyCode: KEY_SEMICOLON,
		});
	});

	it('should create a link when pressing ENTER', function() {
		// FIXME: Is there a way to force CKEDITOR to generate consistent markup in case of pressing ENTER?
		// Bender does not fix the generated markup neither.
		var expected =
			'<p>link <a href="http://www.liferay.com" rel="noopener noreferrer">www.liferay.com</a></p><p>text</p>';

		if (CKEDITOR.env.ie && CKEDITOR.env.version < 11) {
			expected =
				'<p>link <a href="http://www.liferay.com" rel="noopener noreferrer">www.liferay.com</a><br />&nbsp;</p><p>text</p>';
		}

		testLink.call(this, {
			expected: expected,
			html: '<p>link www.liferay.com</p>{ }<p>text</p>',
			keyCode: KEY_ENTER,
		});
	});

	xit('should not trigger any error when pressing ENTER', function() {
		bender.tools.selection.setWithHtml(this.nativeEditor, '<p></p>');

		var spanElement = CKEDITOR.dom.element.createFromHtml(
			'<span>@test</span>'
		);

		this.nativeEditor.element.findOne('p').append(spanElement);

		var spaceElement = new CKEDITOR.dom.text(' ');

		spaceElement.insertAfter(spanElement);

		happen.keyup(this._editable, {
			keyCode: KEY_ENTER,
		});

		var data = this.nativeEditor.element.$.innerHTML;

		assert.equal(data, '<p><span>@test</span> </p>');
	});

	it('creates a link when the last word is a URL', function() {
		testLink.call(this, {
			expected:
				'<p>link <a href="http://liferay.com" rel="noopener noreferrer">liferay.com</a></p>',
			html: '<p>link liferay.com { }</p>',
			keyCode: KEY_COMMA,
		});

		testLink.call(this, {
			expected:
				'<p>link <a href="http://ww.liferay.com" rel="noopener noreferrer">ww.liferay.com</a></p><p>text</p>',
			html: '<p>link ww.liferay.com</p>{ }<p>text</p>',
			keyCode: KEY_ENTER,
		});

		testLink.call(this, {
			expected:
				'<p>link <a href="http://www.liferay.org" rel="noopener noreferrer">www.liferay.org</a></p>',
			html: '<p>link www.liferay.org { }</p>',
			keyCode: KEY_SPACE,
		});

		testLink.call(this, {
			expected:
				'<p>link <a href="http://www.liferay.com" rel="noopener noreferrer">http://www.liferay.com</a></p>',
			html: '<p>link http://www.liferay.com { }</p>',
			keyCode: KEY_SPACE,
		});

		testLink.call(this, {
			expected:
				'<p>link <a href="http://liferay.com" rel="noopener noreferrer">http://liferay.com</a></p>',
			html: '<p>link http://liferay.com { }</p>',
			keyCode: KEY_SPACE,
		});

		testLink.call(this, {
			expected:
				'<p>link <a href="https://www.liferay.com" rel="noopener noreferrer">https://www.liferay.com</a></p>',
			html: '<p>link https://www.liferay.com { }</p>',
			keyCode: KEY_SPACE,
		});

		testLink.call(this, {
			expected:
				'<p>link <a href="http://www.alloy-editor.com" rel="noopener noreferrer">http://www.alloy-editor.com</a></p>',
			html: '<p>link http://www.alloy-editor.com { }</p>',
			keyCode: KEY_SPACE,
		});

		testLink.call(this, {
			expected:
				'<p>link <a href="http://ww.liferay.com" rel="noopener noreferrer">ww.liferay.com</a></p>',
			html: '<p>link ww.liferay.com { }</p>',
			keyCode: KEY_SPACE,
		});

		testLink.call(this, {
			expected:
				'<p>link <a href="http://liferay.com" rel="noopener noreferrer">liferay.com</a></p>',
			html: '<p>link liferay.com { }</p>',
			keyCode: KEY_SPACE,
		});
	});

	it('should remove the created link when pressing BACKSPACE', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'link www.liferay.com { }'
		);

		var editable = this.nativeEditor.editable();

		happen.keyup(editable.$, {
			keyCode: KEY_SPACE,
		});

		happen.keydown(editable.$, {
			keyCode: KEY_BACK,
		});

		var data = getData.call(this);

		assert.strictEqual(data, '<p>link www.liferay.com</p>');
	});

	it('should not remove a link that has not just been created', function() {
		testLink.call(this, {
			expected:
				'<p>link <a href="http://www.liferay.com" rel="noopener noreferrer">www.liferay.com</a></p>',
			html:
				'<p>link <a href="http://www.liferay.com" rel="noopener noreferrer">www.liferay.com</a> { }</p>',
			keyCode: KEY_BACK,
		});
	});

	it('does not create a link when the last word is not a URL', function() {
		testLink.call(this, {
			expected: '<p>invalid link some_word</p>',
			html: 'invalid link some_word { }',
			keyCode: KEY_SEMICOLON,
		});

		testLink.call(this, {
			expected: '<p>invalid link http:ww.liferay.com</p>',
			html: 'invalid link http:ww.liferay.com { }',
			keyCode: KEY_SPACE,
		});

		testLink.call(this, {
			expected: '<p>invalid link eeeewwww</p><p>text</p>',
			html: '<p>invalid link eeeewwww</p>{ }<p>text</p>',
			keyCode: KEY_ENTER,
		});

		testLink.call(this, {
			expected: '<p>invalid link wwwwwwwww</p>',
			html: '<p>invalid link wwwwwwwww { }</p>',
			keyCode: KEY_SPACE,
		});

		testLink.call(this, {
			expected: '<p>invalid link www www www www</p>',
			html: '<p>invalid link www www www www { }</p>',
			keyCode: KEY_SPACE,
		});
	});

	it('should create a link at the end of the content when pressing SPACE', function() {
		testLinkAtEnd.call(this, KEY_SPACE);
	});

	it('should create a link at the end of the content when pressing COMMA', function() {
		testLinkAtEnd.call(this, KEY_COMMA);
	});

	it('should create a link at the end of the content when pressing SEMICOLON', function() {
		testLinkAtEnd.call(this, KEY_SEMICOLON);
	});

	it('should create a link at the end of the content when pressing ENTER', function() {
		testLinkAtEnd.call(this, KEY_ENTER);
	});

	it('should create a link with default target when pressing SPACE', function() {
		this.nativeEditor.config.linkCfg = {
			defaultTarget: '_blank',
		};
		testLink.call(this, {
			expected:
				'<p>link <a href="http://www.liferay.com" rel="noopener noreferrer" target="_blank">www.liferay.com</a></p>',
			html: '<p>link www.liferay.com { }</p>',
			keyCode: KEY_SPACE,
		});
	});

	function testLink(config) {
		bender.tools.selection.setWithHtml(this.nativeEditor, config.html);

		happen.keyup(this._editable, {
			keyCode: config.keyCode,
		});

		var data = getData.call(this);

		assert.equal(data, config.expected);
	}

	function testLinkAtEnd(keyCode) {
		var linkText = 'www.liferay.com';

		this.nativeEditor.setData(linkText);

		var container = this.nativeEditor.element
			.getNextSourceNode()
			.getNextSourceNode();

		var range = this.nativeEditor.createRange();
		range.setStart(container, linkText.length);
		range.setEnd(container, linkText.length);

		this.nativeEditor.getSelection().selectRanges([range]);

		assert.doesNotThrow(
			function() {
				happen.keyup(this._editable, {keyCode});
			}.bind(this)
		);
	}

	function getData() {
		return bender.tools.getData(this.nativeEditor, {
			compatHtml: true,
			fixHtml: true,
		});
	}
});
