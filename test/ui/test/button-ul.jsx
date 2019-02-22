import ButtonUnorderedlist from '../../../src/components/buttons/button-ul.jsx';

var assert = chai.assert;
var Simulate = ReactTestUtils.Simulate;

describe('ButtonUnorderedlist', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should make a text selection an unordered list on click', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<p>There should be a {selection made...</p><p>An unordered} list.</p>'
		);

		var buttonUnorderedlist = this.render(
			<ButtonUnorderedlist />,
			this.container
		);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: false,
			compatHtml: true,
		});

		assert.strictEqual(
			data,
			'<ul><li>There should be a selection made...</li><li>An unordered list.</li></ul>'
		);
	});

	it('should add class which represents pressed button', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<ul><li>A {selection made...</li><li>An unordered} list.</li></ul>'
		);

		var buttonUnorderedlist = this.render(
			<ButtonUnorderedlist />,
			this.container
		);

		var buttonDOMNode = this.container.firstChild;

		assert.strictEqual(
			buttonDOMNode.classList.contains('ae-button-pressed'),
			true
		);
	});
});
