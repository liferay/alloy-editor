import ButtonDropdown from '../../../src/components/buttons/button-dropdown.jsx';
import ButtonLinkEdit from '../../../src/components/buttons/button-link-edit.jsx';
import ButtonLinkTargetEdit from '../../../src/components/buttons/button-link-target-edit.jsx';
import ButtonTargetList from '../../../src/components/buttons/button-target-list.jsx';

var assert = chai.assert;
var Simulate = ReactTestUtils.Simulate;
var TestUtils = ReactTestUtils;

describe('ButtonTargetList', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should ButtonTargetList dropdown component when dropdown button is pressed', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'There should be a <a>{selection}</a> made bold.'
		);

		var buttonLink = this.render(<ButtonLinkEdit />, this.container);

		var buttonLinkTargetEditRendered = TestUtils.scryRenderedComponentsWithType(
			buttonLink,
			ButtonLinkTargetEdit
		);

		var button = ReactDOM.findDOMNode(
			buttonLinkTargetEditRendered[0]
		).getElementsByTagName('button')[0];

		Simulate.click(button);

		var buttonDropdown = TestUtils.scryRenderedComponentsWithType(
			buttonLink,
			ButtonDropdown
		);

		var buttonTargetList = TestUtils.scryRenderedComponentsWithType(
			buttonLink,
			ButtonTargetList
		);

		assert.strictEqual(buttonTargetList.length, 1);

		assert.strictEqual(buttonDropdown.length, 1);
	});
});
