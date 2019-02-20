import ButtonStylesList from '../../../src/components/buttons/button-styles-list.jsx';
import ButtonStylesListItemRemove from '../../../src/components/buttons/button-styles-list-item-remove.jsx';

var assert = chai.assert;
var TestUtils = ReactTestUtils;

describe('ButtonStylesList', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should render remove styles button by default', function() {
		var styles = [
			{
				name: AlloyEditor.Strings.h1,
				style: {
					element: 'h1',
				},
			},
		];

		var buttonStylesList = this.render(
			<ButtonStylesList toggleDropdown={sinon.stub()} styles={styles} />,
			this.container
		);

		assert.isObject(
			TestUtils.findRenderedComponentWithType(
				buttonStylesList,
				ButtonStylesListItemRemove
			)
		);
	});

	it('should prevent rendering of remove styles button', function() {
		var styles = [
			{
				name: AlloyEditor.Strings.h1,
				style: {
					element: 'h1',
				},
			},
		];

		var buttonStylesList = this.render(
			<ButtonStylesList showRemoveStylesItem={false} styles={styles} />,
			this.container
		);

		assert.throws(function() {
			TestUtils.findRenderedComponentWithType(
				buttonStylesList,
				ButtonStylesListItemRemove
			);
		});
	});
});
