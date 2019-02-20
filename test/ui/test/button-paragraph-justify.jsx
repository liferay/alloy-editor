import ButtonParagraphJustify from '../../../src/components/buttons/button-paragraph-justify.jsx';

var assert = chai.assert;
var Simulate = ReactTestUtils.Simulate;

describe('ButtonParagraphJustify', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should justify the selection on click', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'{There should be a paragraph justified.}'
		);

		var buttonParagraphJustify = this.render(
			<ButtonParagraphJustify />,
			this.container
		);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: true,
			compatHtml: true,
		});

		assert.strictEqual(
			'<p style="text-align:justify;">there should be a paragraph justified.</p>',
			data
		);
	});

	it('should preserve tags ad attributes of the selection', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<h1 style="color: red;">{There should be a paragraph justified.}</h1>'
		);

		var buttonParagraphJustify = this.render(
			<ButtonParagraphJustify />,
			this.container
		);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: true,
			compatHtml: true,
		});

		assert.strictEqual(
			'<h1 style="color:red;text-align:justify;">there should be a paragraph justified.</h1>',
			data
		);
	});

	it('should add class which represents pressed button', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<p style="text-align: justify;">{A paragraph justified.}</p>'
		);

		var buttonParagraphJustify = this.render(
			<ButtonParagraphJustify />,
			this.container
		);

		var buttonDOMNode = this.container.firstChild;

		assert.isTrue(buttonDOMNode.classList.contains('ae-button-pressed'));
	});
});
