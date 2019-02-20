import ButtonOrderedList from '../../../src/components/buttons/button-ol.jsx';

var assert = chai.assert;
var Simulate = ReactTestUtils.Simulate;

describe('ButtonOrderedList', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should make a text selection an ordered list on click', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<p>There should be a {selection made...</p><p>An ordereed} list.</p>'
		);

		var buttonOrderedlist = this.render(
			<ButtonOrderedList />,
			this.container
		);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: false,
			compatHtml: true,
		});

		assert.strictEqual(
			data,
			'<ol><li>There should be a selection made...</li><li>An ordereed list.</li></ol>'
		);
	});

	it('should add class which represents pressed button', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<ol><li>A {selection made...</li><li>An ordereed} list.</li></ol>'
		);

		var buttonOrderedlist = this.render(
			<ButtonOrderedList />,
			this.container
		);

		var buttonDOMNode = this.container.firstChild;

		assert.strictEqual(
			buttonDOMNode.classList.contains('ae-button-pressed'),
			true
		);
	});
});
