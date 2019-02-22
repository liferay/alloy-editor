import ButtonLinkEdit from '../../../src/components/buttons/button-link-edit.jsx';
import ButtonLinkTargetEdit from '../../../src/components/buttons/button-link-target-edit.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;

describe('ButtonLinkTargetEdit', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('renders ButtonLinkTargetEdit into ButtonLinkEdit by default', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'There should be a <a>{selection}</a> made bold.'
		);

		var buttonLink = this.render(<ButtonLinkEdit />, this.container);

		var buttonLinkTargetEditRendered = TestUtils.scryRenderedComponentsWithType(
			buttonLink,
			ButtonLinkTargetEdit
		);

		assert.strictEqual(buttonLinkTargetEditRendered.length, 1);
	});

	it('does not render ButtonLinkTargetEdit when showTargetSelector is false', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'There should be a <a>{selection}</a> made bold.'
		);

		var buttonLink = this.render(
			<ButtonLinkEdit showTargetSelector={false} />,
			this.container
		);

		var buttonLinkTargetEditRendered = TestUtils.scryRenderedComponentsWithType(
			buttonLink,
			ButtonLinkTargetEdit
		);

		assert.strictEqual(buttonLinkTargetEditRendered.length, 0);
	});
});
