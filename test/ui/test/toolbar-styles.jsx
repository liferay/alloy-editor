import ToolbarStyles from '../../../src/components/toolbars/toolbar-styles.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;

describe('ToolbarStyles', function() {
	describe('with buttonCfg object', function() {
		beforeEach(function(done) {
			Utils.createAlloyEditor.call(this, done, {
				buttonCfg: {
					bold: {
						label: 'btn-bold',
						tabIndex: 1024,
					},
					italic: {
						label: 'btn-italic',
						tabIndex: 2048,
					},
				},
			});
		});

		afterEach(Utils.destroyAlloyEditor);

		it('renders buttons with properties from buttonCfg', function() {
			var toolbarStyles = (toolbarStyles = this.render(
				<ToolbarStyles />,
				this.container
			));

			var buttons = toolbarStyles.getToolbarButtons(['bold', 'italic'], {
				manualSelection: null,
				selectionType: 'text',
			});

			assert.strictEqual(2, buttons.length);

			var buttonBold = buttons[0];
			assert.strictEqual('bold', buttonBold.key);
			assert.strictEqual('btn-bold', buttonBold.props.label);
			assert.strictEqual(1024, buttonBold.props.tabIndex);

			var buttonItalic = buttons[1];
			assert.strictEqual('italic', buttonItalic.key);
			assert.strictEqual('btn-italic', buttonItalic.props.label);
			assert.strictEqual(2048, buttonItalic.props.tabIndex);
		});
	});

	describe('with default editor configuration', function() {
		beforeEach(Utils.createAlloyEditor);
		afterEach(Utils.destroyAlloyEditor);

		it("constrains the toolbar's position", function() {
			var toolbarStyles = this.render(<ToolbarStyles />, this.container);

			var res = toolbarStyles.getConstrainedPosition(
				{
					height: 50,
					left: 0,
					top: -20,
					width: 300,
				},
				{
					width: 200,
				}
			);

			assert.strictEqual(-100, res.x);
			assert.strictEqual(0, res.y);

			res = toolbarStyles.getConstrainedPosition({
				height: 50,
				left: 0,
				top: -20,
				width: 300,
			});

			assert.strictEqual(0, res.y);
		});
	});
});
