import ButtonLinkEditBrowse from '../../../src/components/buttons/button-link-edit-browse.jsx';

const assert = chai.assert;
const Simulate = ReactTestUtils.Simulate;
const TestUtils = ReactTestUtils;
const documentBrowseLinkUrl = 'http://alloyeditor.com/some/location';
let documentBrowseLinkCallback;

describe('ButtonLinkEditBrowse', function() {
	beforeEach(function(done) {
		documentBrowseLinkCallback = sinon.spy();

		Utils.createAlloyEditor.call(this, done, {
			documentBrowseLinkCallback,
			documentBrowseLinkUrl,
		});
	});

	afterEach(Utils.destroyAlloyEditor);

	it('should invoke a callback', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			'<a href="http://alloyeditor.com" target="_blank">{Alloy Editor}</a>'
		);

		const buttonLinkEditBrowse = this.render(
			<ButtonLinkEditBrowse />,
			this.container
		);

		const buttons = TestUtils.scryRenderedDOMComponentsWithClass(
			buttonLinkEditBrowse,
			'ae-button'
		);

		const buttonBrowse = buttons[buttons.length - 1];

		Simulate.click(buttonBrowse);

		assert.ok(documentBrowseLinkCallback.calledOnce);

		assert.ok(
			documentBrowseLinkCallback.calledWith(
				this.nativeEditor,
				documentBrowseLinkUrl,
				sinon.match(value => {
					// This is a dynamically-constructed callback function
					// created in `_browseClick` in <ButtonLinkEditBrowse>:
					return (
						typeof value === 'function' &&
						value.toString().match(/\blinkTarget\b/)
					);
				})
			)
		);
	});
});
