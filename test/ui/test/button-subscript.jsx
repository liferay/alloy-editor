import ButtonSubscript from '../../../src/components/buttons/button-subscript.jsx';

var assert = chai.assert;
var Simulate = ReactTestUtils.Simulate;

describe('ButtonSubscript', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should make a text selection subscript on click', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'There should be a {selection} made subscript.'
		);

		var buttonSubscript = this.render(<ButtonSubscript />, this.container);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: false,
			compatHtml: true,
		});

		assert.strictEqual(
			data,
			'<p>There should be a <sub>selection</sub> made subscript.</p>'
		);
	});

	it('should add class which represents pressed button', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'A <sub>{selection}</sub> made subscript.'
		);

		var buttonSubscript = this.render(<ButtonSubscript />, this.container);

		var buttonDOMNode = this.container.firstChild;

		assert.strictEqual(
			buttonDOMNode.classList.contains('ae-button-pressed'),
			true
		);
	});
});
