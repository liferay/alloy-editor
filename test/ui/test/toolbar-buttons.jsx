import ToolbarAdd from '../../../src/components/toolbars/toolbar-add.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;

describe('ToolbarButtons', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it("should propagate user's configuration to a button", function() {
		var tableAttrs = {
			border: 1,
			cellPadding: 0,
			cellSpacing: 0,
			className: 'rte-table',
		};

		var toolbarAddConfig = {
			buttons: [
				{
					name: 'table',
					cfg: {
						tableAttributes: tableAttrs,
					},
				},
			],
			tabIndex: 2,
		};

		var toolbarAdd = this.render(
			<ToolbarAdd config={toolbarAddConfig} />,
			this.container
		);

		var buttons = toolbarAdd.getToolbarButtons(toolbarAddConfig.buttons);

		assert.deepEqual(tableAttrs, buttons[0].props.tableAttributes);
	});
});
