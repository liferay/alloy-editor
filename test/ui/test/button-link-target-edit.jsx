import ButtonLinkEdit from '../../../src/components/buttons/button-link-edit.jsx';
import ButtonLinkTargetEdit from '../../../src/components/buttons/button-link-target-edit.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;

describe('ButtonLinkTargetEdit', function() {
	before(Utils.createAlloyEditor);

	after(Utils.destroyAlloyEditor);

	beforeEach(Utils.beforeEach);

	afterEach(Utils.afterEach);

	it('should render ButtonLinkTargetEdit into ButtonLinkEdit by default', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'There should be a <a>{selection}</a> made bold.'
		);

		var buttonLink = ReactDOM.render(
			<ButtonLinkEdit editor={this.editor} />,
			this.container
		);

		var buttonLinkTargetEditRendered = TestUtils.scryRenderedComponentsWithType(
			buttonLink,
			ButtonLinkTargetEdit
		);

		assert.strictEqual(buttonLinkTargetEditRendered.length, 1);
	});

	it('should dont render ButtonLinkTargetEdit when showTargetSelector is false', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'There should be a <a>{selection}</a> made bold.'
		);

		var buttonLink = ReactDOM.render(
			<ButtonLinkEdit editor={this.editor} showTargetSelector={false} />,
			this.container
		);

		var buttonLinkTargetEditRendered = TestUtils.scryRenderedComponentsWithType(
			buttonLink,
			ButtonLinkTargetEdit
		);

		assert.strictEqual(buttonLinkTargetEditRendered.length, 0);
	});
});
