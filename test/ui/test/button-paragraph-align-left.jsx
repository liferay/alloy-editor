import ButtonParagraphAlignLeft from '../../../src/components/buttons/button-paragraph-align-left.jsx';

var assert = chai.assert;
var Simulate = ReactTestUtils.Simulate;

describe('ButtonParagraphAlignLeft', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should align the selection to the left on click', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<p style="text-align:right">{There should be a paragraph aligned to the left.}</p>'
		);

		var buttonParagraphAlignLeft = this.render(
			<ButtonParagraphAlignLeft />,
			this.container
		);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: true,
			compatHtml: true,
		});

		assert.strictEqual(
			'<p>there should be a paragraph aligned to the left.</p>',
			data
		);
	});

	it('should preserve tags ad attributes of the selection', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<h1 style="color: red;">{There should be a paragraph aligned to the left.}</h1>'
		);

		var buttonParagraphAlignLeft = this.render(
			<ButtonParagraphAlignLeft />,
			this.container
		);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: true,
			compatHtml: true,
		});

		assert.strictEqual(
			'<h1 style="color:red;">there should be a paragraph aligned to the left.</h1>',
			data
		);
	});

	it('should add class which represents pressed button', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<p>{A paragraph aligned to the left.}</p>'
		);

		var buttonParagraphAlignLeft = this.render(
			<ButtonParagraphAlignLeft />,
			this.container
		);

		var buttonDOMNode = this.container.firstChild;

		assert.isTrue(buttonDOMNode.classList.contains('ae-button-pressed'));
	});
});
