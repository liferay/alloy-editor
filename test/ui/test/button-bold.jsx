import ButtonBold from '../../../src/components/buttons/button-bold.jsx';

var assert = chai.assert;
var Simulate = ReactTestUtils.Simulate;

var KEY_B = 66;

describe('ButtonBold', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should make a text selection bold on click', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'There should be a {selection} made bold.'
		);

		var buttonBold = this.render(<ButtonBold />, this.container);

		ReactTestUtils.Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: false,
			compatHtml: true,
		});

		assert.strictEqual(
			data,
			'<p>There should be a <strong>selection</strong> made bold.</p>'
		);
	});

	it('should make a text selection bold on [Ctrl|Cmd] + B', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'There should be a {selection} made bold.'
		);

		var buttonBold = this.render(<ButtonBold />, this.container);

		happen.keydown(this._editable, {
			ctrlKey: true,
			keyCode: KEY_B,
		});

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: false,
			compatHtml: true,
		});

		assert.strictEqual(
			data,
			'<p>There should be a <strong>selection</strong> made bold.</p>'
		);
	});

	it('should add class which represents pressed button', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'A <strong>{selection}</strong> made bold.'
		);

		var buttonBold = this.render(<ButtonBold />, this.container);

		var buttonDOMNode = this.container.firstChild;

		assert.strictEqual(
			buttonDOMNode.classList.contains('ae-button-pressed'),
			true
		);
	});
});
