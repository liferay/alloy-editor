import ButtonDropdown from '../../../src/components/buttons/button-dropdown.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;
var Simulate = TestUtils.Simulate;

describe('RichComboBridge', function() {
	before(function(done) {
		Utils.createAlloyEditor.call(this, done, {
			extraPlugins:
				AlloyEditor.Core.ATTRS.extraPlugins.value +
				',ae_richcombobridge,test_richcombobridge',
		});
	});

	after(Utils.destroyAlloyEditor);

	beforeEach(Utils.beforeEach);

	afterEach(Utils.afterEach);

	it('should create a rich combo and invoke its initialization methods', function() {
		assert.property(
			AlloyEditor.Buttons,
			'ButtonRichCombo',
			'ButtonRichCombo should have been registered'
		);

		var initListener = sinon.stub();

		this.nativeEditor.once('richComboInit', initListener);

		var renderListener = sinon.stub();

		this.nativeEditor.once('richComboRender', renderListener);

		this.render(<AlloyEditor.Buttons.ButtonRichCombo />, this.container);

		assert.isTrue(initListener.calledOnce);
		assert.isTrue(renderListener.calledOnce);
	});

	it('should render just the menu button when not expanded', function() {
		var buttonRichCombo = this.render(
			<AlloyEditor.Buttons.ButtonRichCombo expanded={false} />,
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

	it.skip('should show a dropdown with the action buttons when expanded', function() {
		var buttonRichCombo = this.render(
			<AlloyEditor.Buttons.ButtonRichCombo expanded={true} />,
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

	it.skip('should show a dropdown with the action buttons when expanded', function() {
		var buttonRichCombo = this.render(
			<AlloyEditor.Buttons.ButtonRichCombo expanded={true} />,
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

	it.skip('should execute the onClick method with the item value when clicking on an item', function() {
		var clickListener = sinon.stub();

		var clickListenerProxy = function(event) {
			clickListener(event.data);
		};

		this.nativeEditor.once('richComboClick', clickListenerProxy);

		var buttonRichCombo = this.render(
			<AlloyEditor.Buttons.ButtonRichCombo expanded={true} />,
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

		var richComboItem = TestUtils.findAllInRenderedTree(
			dropdown[0],
			function(component) {
				return (
					TestUtils.isDOMComponent(component) &&
					component.getAttribute('data-value') === 'entry2'
				);
			}
		);

		Simulate.click(ReactDOM.findDOMNode(richComboItem[0]));

		assert.isTrue(clickListener.calledOnce);
		assert.isTrue(clickListener.calledWith('entry2'));
	});
});
