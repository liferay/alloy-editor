var assert = chai.assert;

var KEY_A = 65;

var KEY_BACK = 8;

var KEY_SPACE = 32;

// https://github.com/ckeditor/ckeditor-dev/blob/major/core/selection.js#L10
var zeroWidthSpace = '';

for (var i = 0; i < 7; i++) {
	zeroWidthSpace += '\u200b';
}

describe('Autolist', function() {
	beforeEach(function(done) {
		Utils.createCKEditor.call(this, done, {
			extraPlugins: 'undo,ae_autolist,undo',
			allowedContent: 'p ol ul li',
		});
	});

	afterEach(Utils.destroyCKEditor);

	it('should create an empty numbered list when pressing SPACE', function() {
		testList.call(this, {
			expected: '<ol><li>' + zeroWidthSpace + '</li></ol>',
			html: '<p>1.{}</p>',
			keyCode: KEY_SPACE,
		});
	});

	it('should create a numbered list when pressing SPACE although the line has text', function() {
		testList.call(this, {
			expected: '<ol><li>first line</li></ol>',
			html: '<p>1.{}first line</p>',
			keyCode: KEY_SPACE,
		});
	});

	it('should create an empty bulleted list when pressing SPACE', function() {
		testList.call(this, {
			expected: '<ul><li>' + zeroWidthSpace + '</li></ul>',
			html: '<p>*{}</p>',
			keyCode: KEY_SPACE,
		});
	});

	it('should create a bulleted list when pressing SPACE although the line has text', function() {
		testList.call(this, {
			expected: '<ul><li>first line</li></ul>',
			html: '<p>*{}first line</p>',
			keyCode: KEY_SPACE,
		});
	});

	it('should not create numbered list when pressing SPACE in other position', function() {
		testList.call(this, {
			expected: '<p>1. no list</p>',
			html: '<p>1. {}no list</p>',
			keyCode: KEY_SPACE,
		});
	});

	it('should not create bulleted list when pressing SPACE in other position', function() {
		testList.call(this, {
			expected: '<p>* not create list</p>',
			html: '<p>* not create{} list</p>',
			keyCode: KEY_SPACE,
		});
	});

	it('should remove list and keep bullet when pressing BACK after creating list', function() {
		testList.call(this, {
			expected: '<ul><li>' + zeroWidthSpace + '</li></ul>',
			html: '<p>*{}</p>',
			keyCode: KEY_SPACE,
		});

		happen.keydown(this._editable, {
			keyCode: KEY_BACK,
		});

		var data = getData.call(this);

		assert.oneOf(data, [
			'<p>' + zeroWidthSpace + '*</p>',
			'<p>' + zeroWidthSpace + '*&nbsp;</p>',
		]);
	});

	function testList(config) {
		bender.tools.selection.setWithHtml(this.nativeEditor, config.html);

		happen.keydown(this._editable, {
			keyCode: config.keyCode,
		});

		var data = getData.call(this);

		assert.strictEqual(data, config.expected);
	}

	function getData() {
		return bender.tools.getData(this.nativeEditor, {
			compatHtml: true,
			fixHtml: true,
		});
	}
});
