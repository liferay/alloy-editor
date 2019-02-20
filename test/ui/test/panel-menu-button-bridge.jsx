import ButtonDropdown from '../../../src/components/buttons/button-dropdown.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;
var Simulate = TestUtils.Simulate;

describe('PanelMenuButtonBridge', function() {
	beforeEach(function(done) {
		Utils.createAlloyEditor.call(this, done, {
			extraPlugins:
				AlloyEditor.Core.ATTRS.extraPlugins.value +
				',ae_panelmenubuttonbridge,test_panelmenubuttonbridge',
		});
	});

	afterEach(Utils.destroyAlloyEditor);

	it('should create a panel menu button', function() {
		assert.property(
			AlloyEditor.Buttons,
			'ButtonPanelMenuButton',
			'ButtonPanelMenuButton should have been registered'
		);
	});

	it('should render just the menu button when not expanded', function() {
		var panelMenuButton = this.render(
			<AlloyEditor.Buttons.ButtonPanelMenuButton expanded={false} />,
			this.container
		);

		var menuButton = TestUtils.findRenderedDOMComponentWithTag(
			panelMenuButton,
			'button'
		);

		var dropdown = TestUtils.scryRenderedDOMComponentsWithClass(
			panelMenuButton,
			'ae-dropdown'
		);

		assert.ok(menuButton);
		assert.equal(0, dropdown.length);
	});

	it.skip('should show a dropdown with the panel css class and panel contents when expanded', function() {
		var panelMenuButton = this.render(
			<AlloyEditor.Buttons.ButtonPanelMenuButton expanded={true} />,
			this.container
		);

		var dropdown = TestUtils.findAllInRenderedTree(
			panelMenuButton,
			function(component) {
				return TestUtils.isCompositeComponentWithType(
					component,
					ButtonDropdown
				);
			}
		);

		assert.ok(dropdown);
		assert.equal(1, dropdown.length);

		var panelContent = TestUtils.scryRenderedDOMComponentsWithClass(
			dropdown[0],
			'test_panelmenubuttonbridge'
		)[0];

		assert.ok(panelContent);
		assert.equal(panelContent.innerHTML, '<span>panelMenuContent</span>');
	});
});
