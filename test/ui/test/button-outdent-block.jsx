import ButtonOutdentBlock from '../../../src/components/buttons/button-outdent-block.jsx';

var assert = chai.assert;
var Simulate = ReactTestUtils.Simulate;

describe('ButtonOutdent', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should outdent the content when the outdent button is clicked', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<p style="margin-left: 100px">This text will be outdent {selection}.</p>'
		);

		var buttonOutdent = this.render(<ButtonOutdentBlock />, this.container);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: false,
			compatHtml: true,
		});

		assert.strictEqual(
			data,
			'<p style="margin-left: 80px;">This text will be outdent selection.</p>'
		);
	});

	it('should outdent the content with a customizable indentation', function() {
		this.nativeEditor.config.indentOffset = 25;
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<p style="margin-left: 100px">This text will be outdent {selection}.</p>'
		);

		var buttonOutdent = this.render(<ButtonOutdentBlock />, this.container);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: false,
			compatHtml: true,
		});

		assert.strictEqual(
			data,
			'<p style="margin-left: 75px;">This text will be outdent selection.</p>'
		);
	});

	it('should outdent the content with a customizable indentation unit', function() {
		this.nativeEditor.config.indentOffset = 25;
		this.nativeEditor.config.indentUnit = 'em';

		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<p style="margin-left: 100em">This text will be outdent {selection}.</p>'
		);

		var buttonOutdent = this.render(<ButtonOutdentBlock />, this.container);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: false,
			compatHtml: true,
		});

		assert.strictEqual(
			data,
			'<p style="margin-left: 75em;">This text will be outdent selection.</p>'
		);
	});
});
