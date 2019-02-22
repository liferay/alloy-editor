import ButtonTableRemove from '../../../src/components/buttons/button-table-remove.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;
var Simulate = TestUtils.Simulate;

describe('ButtonTableRemove', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should remove a table if selection is inside one', function() {
		var buttonTableRemove = this.render(
			<ButtonTableRemove />,
			this.container
		);

		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<table><tbody><tr><td> {}</td></tr></tbody></table>'
		);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: false,
			compatHtml: true,
		});

		assert.strictEqual(data, '');
	});

	it('should noop if selection is outside a table', function() {
		var buttonTableRemove = this.render(
			<ButtonTableRemove />,
			this.container
		);

		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'Content with {no} table'
		);

		Simulate.click(this.container.firstChild);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: false,
			compatHtml: true,
		});

		assert.strictEqual(data, '<p>Content with no table</p>');
	});
});
