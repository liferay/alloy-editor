import ButtonParagraphCenter from '../../../src/components/buttons/button-paragraph-center.jsx';

var assert = chai.assert;
var Simulate = ReactTestUtils.Simulate;

describe('ButtonParagraphCenter', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should center the selection on click', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'{There should be a paragraph centered.}'
		);

		var buttonParagraphCenter = this.render(
			<ButtonParagraphCenter />,
			this.container
		);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: true,
			compatHtml: true,
		});

		assert.strictEqual(
			'<p style="text-align:center;">there should be a paragraph centered.</p>',
			data
		);
	});

	it('should preserve tags ad attributes of the selection', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<h1 style="color: red;">{There should be a paragraph centered.}</h1>'
		);

		var buttonParagraphCenter = this.render(
			<ButtonParagraphCenter />,
			this.container
		);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: true,
			compatHtml: true,
		});

		assert.strictEqual(
			'<h1 style="color:red;text-align:center;">there should be a paragraph centered.</h1>',
			data
		);
	});

	it('should add class which represents pressed button', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<p style="text-align: center;">{A paragraph centered.}</p>'
		);

		var buttonParagraphCenter = this.render(
			<ButtonParagraphCenter />,
			this.container
		);

		var buttonDOMNode = this.container.firstChild;

		assert.isTrue(buttonDOMNode.classList.contains('ae-button-pressed'));
	});
});
