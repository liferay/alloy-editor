import ButtonTable from '../../../src/components/buttons/button-table.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;
var Simulate = TestUtils.Simulate;

describe('ButtonTableEdit', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should render just the table button when not in exclusive mode', function() {
		var buttonTable = this.render(
			<ButtonTable
				cancelExclusive={sinon.stub()}
				renderExclusive={false}
			/>,
			this.container
		);

		var button = TestUtils.findRenderedDOMComponentWithTag(
			buttonTable,
			'button'
		);

		var editTable = TestUtils.scryRenderedDOMComponentsWithClass(
			buttonTable,
			'ae-container-edit-table'
		);

		assert.ok(button);
		assert.notOk(editTable.length);
	});

	it('should show the table edit button when in exclusive mode', function() {
		var buttonTable = this.render(
			<ButtonTable
				cancelExclusive={sinon.stub()}
				renderExclusive={true}
			/>,
			this.container
		);

		var editTable = TestUtils.findRenderedDOMComponentWithClass(
			buttonTable,
			'ae-container-edit-table'
		);

		assert.ok(editTable);
	});
});
