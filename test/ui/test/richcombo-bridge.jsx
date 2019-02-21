import ButtonDropdown from '../../../src/components/buttons/button-dropdown.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;
var Simulate = TestUtils.Simulate;

describe('RichComboBridge', function() {
	let counter = 0;
	let richComboName = null;

	beforeEach(function(done) {
		richComboName = `TestButtonRichCombo${++counter}`;
		Utils.createAlloyEditor.call(this, done, {
			extraPlugins:
				AlloyEditor.Core.ATTRS.extraPlugins.value +
				',test_richcombobridge',
			richComboName,
		});
	});

	afterEach(Utils.destroyAlloyEditor);

	it('creates a rich combo and invoke its initialization methods', function() {
		assert.property(
			AlloyEditor.Buttons,
			richComboName,
			`${richComboName} should have been registered`
		);

		var initListener = sinon.stub();

		this.nativeEditor.once('richComboInit', initListener);

		var renderListener = sinon.stub();

		this.nativeEditor.once('richComboRender', renderListener);

		const Component = AlloyEditor.Buttons[richComboName];
		this.render(<Component />, this.container);

		assert.isTrue(initListener.calledOnce);
		assert.isTrue(renderListener.calledOnce);
	});

	it('renders just the menu button when not expanded', function() {
		const Component = AlloyEditor.Buttons[richComboName];
		var buttonRichCombo = this.render(
			<Component expanded={false} />,
			this.container
		);

		var menuButton = TestUtils.findRenderedDOMComponentWithTag(
			buttonRichCombo,
			'button'
		);

		var dropdown = TestUtils.scryRenderedDOMComponentsWithClass(
			buttonRichCombo,
			'ae-dropdown'
		);

		assert.ok(menuButton);
		assert.equal(0, dropdown.length);
	});

	it('shows a dropdown with the action buttons when expanded', function() {
		const Component = AlloyEditor.Buttons[richComboName];
		var buttonRichCombo = this.render(
			<Component expanded={true} />,
			this.container
		);

		var dropdown = TestUtils.findAllInRenderedTree(
			buttonRichCombo,
			function(component) {
				return TestUtils.isCompositeComponentWithType(
					component,
					ButtonDropdown
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

	it('shows a dropdown with the action buttons when expanded', function() {
		const Component = AlloyEditor.Buttons[richComboName];
		var buttonRichCombo = this.render(
			<Component expanded={true} />,
			this.container
		);

		var dropdown = TestUtils.findAllInRenderedTree(
			buttonRichCombo,
			function(component) {
				return TestUtils.isCompositeComponentWithType(
					component,
					ButtonDropdown
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

	it('executes the onClick method with the item value when clicking on an item', function() {
		var clickListener = sinon.stub();

		this.nativeEditor.once('richComboClick', clickListener);

		const Component = AlloyEditor.Buttons[richComboName];
		var buttonRichCombo = this.render(
			<Component expanded={true} />,
			this.container
		);

		var dropdown = TestUtils.findAllInRenderedTree(
			buttonRichCombo,
			function(component) {
				return TestUtils.isCompositeComponentWithType(
					component,
					ButtonDropdown
				);
			}
		);

		assert.ok(dropdown);
		assert.equal(1, dropdown.length);

		var richComboItem = ReactDOM.findDOMNode(buttonRichCombo).querySelector(
			'[data-value=entry2]'
		);

		Simulate.click(richComboItem);

		assert.isTrue(clickListener.calledOnce);
		assert.isTrue(
			clickListener.firstCall.calledWithMatch({data: 'entry2'})
		);
	});
});
