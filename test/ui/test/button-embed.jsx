import ButtonEmbed from '../../../src/components/buttons/button-embed.jsx';

var assert = chai.assert;
var Simulate = ReactTestUtils.Simulate;
var TestUtils = ReactTestUtils;

describe('ButtonEmbed Component', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should render just the embed button when not in exclusive mode', function() {
		var buttonEmbed = this.render(
			<ButtonEmbed
				cancelExclusive={sinon.stub()}
				renderExclusive={false}
			/>,
			this.container
		);

		var button = TestUtils.findRenderedDOMComponentWithTag(
			buttonEmbed,
			'button'
		);

		var editLink = TestUtils.scryRenderedDOMComponentsWithClass(
			buttonEmbed,
			'ae-container-edit-link'
		);

		assert.ok(button);
		assert.notOk(editLink.length);
	});

	it('should show the embed edit button when in exclusive mode', function() {
		var buttonEmbed = this.render(
			<ButtonEmbed
				cancelExclusive={sinon.stub()}
				renderExclusive={true}
			/>,
			this.container
		);

		var editLink = TestUtils.findRenderedDOMComponentWithClass(
			buttonEmbed,
			'ae-container-edit-link'
		);

		assert.ok(editLink);
	});

	it('should invoke requestExclusive when clicking on the button', function() {
		var requestExclusiveListener = sinon.stub();

		var buttonEmbed = this.render(
			<ButtonEmbed requestExclusive={requestExclusiveListener} />,
			this.container
		);

		Simulate.click(this.container.firstChild);

		assert.isTrue(requestExclusiveListener.calledOnce);
	});
});
