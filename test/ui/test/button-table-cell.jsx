import ButtonTableCell from '../../../src/components/buttons/button-table-cell.jsx';
import ButtonCommandsList from '../../../src/components/buttons/button-commands-list.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;

describe('ButtonTableCell', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should render just the menu button when not expanded', function() {
		var toggleDropdown = sinon.stub();

		var buttonTableCell = this.render(
			<ButtonTableCell
				toggleDropdown={toggleDropdown}
				expanded={false}
			/>,
			this.container
		);

		var menuButton = TestUtils.findRenderedDOMComponentWithTag(
			buttonTableCell,
			'button'
		);

		var dropdown = TestUtils.scryRenderedDOMComponentsWithClass(
			buttonTableCell,
			'ae-dropdown'
		);

		assert.ok(menuButton);
		assert.equal(0, dropdown.length);
	});

	it('should show a dropdown with the action buttons when expanded', function() {
		var toggleDropdown = sinon.stub();

		var buttonTableCell = this.render(
			<ButtonTableCell toggleDropdown={toggleDropdown} expanded={true} />,
			this.container
		);

		var dropdown = TestUtils.findAllInRenderedTree(
			buttonTableCell,
			function(component) {
				return TestUtils.isCompositeComponentWithType(
					component,
					ButtonCommandsList
				);
			}
		);

		assert.ok(dropdown);
		assert.equal(1, dropdown.length);

		var actionButtons = TestUtils.scryRenderedDOMComponentsWithTag(
			dropdown[0],
			'button'
		);

		assert.ok(actionButtons.length);
	});

	it('should insert a cell before the current one when clicking on the cellInsertBefore button', function() {
		var toggleDropdown = sinon.stub();
		var initialFixture = '3_by_3_table.html';
		var expectedFixture = '3_by_3_table_extra_cell_second_col.html';
		var buttonDropdown = this.render(
			<ButtonTableCell toggleDropdown={toggleDropdown} expanded={true} />,
			this.container
		);
		var buttonCommand = 'cellInsertBefore';

		Utils.assertDropdownCommandButtonResult.call(this, {
			buttonCommand: buttonCommand,
			buttonDropdown: buttonDropdown,
			expectedFixture: expectedFixture,
			initialFixture: initialFixture,
			buttonCommandsList: ButtonCommandsList,
		});
	});

	it('should insert a cell after the current one when clicking on the cellInsertAfter button', function() {
		var toggleDropdown = sinon.stub();
		var initialFixture = '3_by_3_table.html';
		var expectedFixture = '3_by_3_table_extra_cell_third_col.html';
		var buttonDropdown = this.render(
			<ButtonTableCell toggleDropdown={toggleDropdown} expanded={true} />,
			this.container
		);
		var buttonCommand = 'cellInsertAfter';

		Utils.assertDropdownCommandButtonResult.call(this, {
			buttonCommand: buttonCommand,
			buttonDropdown: buttonDropdown,
			expectedFixture: expectedFixture,
			initialFixture: initialFixture,
			buttonCommandsList: ButtonCommandsList,
		});
	});

	it('should delete a cell after the current one when clicking on the cellDelete button', function() {
		var toggleDropdown = sinon.stub();
		var initialFixture = '3_by_3_table.html';
		var expectedFixture = '3_by_3_table_missing_cell_second_col.html';
		var buttonDropdown = this.render(
			<ButtonTableCell toggleDropdown={toggleDropdown} expanded={true} />,
			this.container
		);
		var buttonCommand = 'cellDelete';

		Utils.assertDropdownCommandButtonResult.call(this, {
			buttonCommand: buttonCommand,
			buttonDropdown: buttonDropdown,
			expectedFixture: expectedFixture,
			initialFixture: initialFixture,
			buttonCommandsList: ButtonCommandsList,
		});
	});

	it('should merge the selected cells when clicking on the cellMerge button', function() {
		var toggleDropdown = sinon.stub();
		var initialFixture = '3_by_3_table_selected_second_row.html';
		var expectedFixture = '3_by_3_table_merged_second_row.html';
		var buttonDropdown = this.render(
			<ButtonTableCell toggleDropdown={toggleDropdown} expanded={true} />,
			this.container
		);
		var buttonCommand = 'cellMerge';

		Utils.assertDropdownCommandButtonResult.call(this, {
			buttonCommand: buttonCommand,
			buttonDropdown: buttonDropdown,
			expectedFixture: expectedFixture,
			initialFixture: initialFixture,
			buttonCommandsList: ButtonCommandsList,
		});
	});

	it('should merge the cell below the current one when clicking on the cellMergeDown button', function() {
		var toggleDropdown = sinon.stub();
		var initialFixture = '3_by_3_table.html';
		var expectedFixture = '3_by_3_table_merged_second_cell_down.html';
		var buttonDropdown = this.render(
			<ButtonTableCell toggleDropdown={toggleDropdown} expanded={true} />,
			this.container
		);
		var buttonCommand = 'cellMergeDown';

		Utils.assertDropdownCommandButtonResult.call(this, {
			buttonCommand: buttonCommand,
			buttonDropdown: buttonDropdown,
			expectedFixture: expectedFixture,
			initialFixture: initialFixture,
			buttonCommandsList: ButtonCommandsList,
		});
	});

	it('should merge the cell right to the current one when clicking on the cellMergeRight button', function() {
		var toggleDropdown = sinon.stub();
		var initialFixture = '3_by_3_table.html';
		var expectedFixture = '3_by_3_table_merged_second_cell_right.html';
		var buttonDropdown = this.render(
			<ButtonTableCell toggleDropdown={toggleDropdown} expanded={true} />,
			this.container
		);
		var buttonCommand = 'cellMergeRight';

		Utils.assertDropdownCommandButtonResult.call(this, {
			buttonCommand: buttonCommand,
			buttonDropdown: buttonDropdown,
			expectedFixture: expectedFixture,
			initialFixture: initialFixture,
			buttonCommandsList: ButtonCommandsList,
		});
	});

	it('should split the cell horizontally when clicking on the cellHorizontalSplit button', function() {
		var toggleDropdown = sinon.stub();
		var initialFixture = '3_by_3_table.html';
		var expectedFixture = '3_by_3_table_split_second_col.html';
		var buttonDropdown = this.render(
			<ButtonTableCell toggleDropdown={toggleDropdown} expanded={true} />,
			this.container
		);
		var buttonCommand = 'cellHorizontalSplit';

		Utils.assertDropdownCommandButtonResult.call(this, {
			buttonCommand: buttonCommand,
			buttonDropdown: buttonDropdown,
			expectedFixture: expectedFixture,
			initialFixture: initialFixture,
			buttonCommandsList: ButtonCommandsList,
		});
	});

	it('should split the cell vertically when clicking on the cellVerticalSplit button', function() {
		var toggleDropdown = sinon.stub();
		var initialFixture = '3_by_3_table.html';
		var expectedFixture = '3_by_3_table_split_second_row.html';
		var buttonDropdown = this.render(
			<ButtonTableCell toggleDropdown={toggleDropdown} expanded={true} />,
			this.container
		);
		var buttonCommand = 'cellVerticalSplit';

		Utils.assertDropdownCommandButtonResult.call(this, {
			buttonCommand: buttonCommand,
			buttonDropdown: buttonDropdown,
			expectedFixture: expectedFixture,
			initialFixture: initialFixture,
			buttonCommandsList: ButtonCommandsList,
		});
	});
});
