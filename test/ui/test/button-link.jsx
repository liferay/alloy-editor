import ButtonLink from '../../../src/components/buttons/button-link.jsx';

var assert = chai.assert;
var Simulate = ReactTestUtils.Simulate;

var KEY_L = 76;

describe('ButtonLink', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should invoke requestExclusive when clicking on the button', function() {
		var requestExclusiveListener = sinon.stub();

		var buttonLink = this.render(
			<ButtonLink requestExclusive={requestExclusiveListener} />,
			this.container
		);

		Simulate.click(this.container.firstChild);

		assert.isTrue(requestExclusiveListener.calledOnce);
	});

	it('should invoke requestExclusive when pressing the keystroke [Ctrl|Cmd]+L', function() {
		var requestExclusiveListener = sinon.stub();

		this.render(
			<ButtonLink requestExclusive={requestExclusiveListener} />,
			this.container
		);

		happen.keydown(this._editable, {
			ctrlKey: true,
			keyCode: KEY_L,
		});

		assert.isTrue(requestExclusiveListener.calledOnce);
	});
});
