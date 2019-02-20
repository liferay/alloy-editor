import ButtonIndentBlock from '../../../src/components/buttons/button-indent-block.jsx';

var assert = chai.assert;
var Simulate = ReactTestUtils.Simulate;

describe('ButtonIndent', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should indent the content when the indent button is clicked', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'This text will be indented {selection}.'
		);

		var buttonIndent = this.render(<ButtonIndentBlock />, this.container);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: false,
			compatHtml: true,
		});

		assert.strictEqual(
			data,
			'<p style="margin-left: 40px;">This text will be indented selection.</p>'
		);
	});

	it('should indent the content with customizable indentation', function() {
		this.nativeEditor.config.indentOffset = 25;
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<p style="margin-left: 100px">This text will be indent {selection}.</p>'
		);

		var buttonIndent = this.render(<ButtonIndentBlock />, this.container);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: false,
			compatHtml: true,
		});

		assert.strictEqual(
			data,
			'<p style="margin-left: 125px;">This text will be indent selection.</p>'
		);
	});

	it('Should indent the content with a customizable indentation unit', function() {
		this.nativeEditor.config.indentOffset = 25;
		this.nativeEditor.config.indentUnit = 'em';

		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<p style="margin-left: 100em">This text will be indent {selection}.</p>'
		);

		var buttonIndent = this.render(<ButtonIndentBlock />, this.container);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: false,
			compatHtml: true,
		});

		assert.strictEqual(
			data,
			'<p style="margin-left: 125em;">This text will be indent selection.</p>'
		);
	});
});
