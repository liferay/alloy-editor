import ButtonLinkEditBrowse from '../../../src/components/buttons/button-link-edit-browse.jsx';

(function() {
	'use strict';

	const assert = chai.assert;
	const Simulate = ReactTestUtils.Simulate;
	const TestUtils = ReactTestUtils;
	const documentBrowseLinkUrl = 'http://alloyeditor.com/some/location';
	let documentBrowseLinkCallback;

	describe('ButtonLinkEditBrowse', () => {
		before(done => {
			documentBrowseLinkCallback = sinon.spy();

			Utils.createAlloyEditor.call(this, done, {
				documentBrowseLinkCallback,
				documentBrowseLinkUrl,
			});
		});

		after(Utils.destroyAlloyEditor);

		beforeEach(Utils.beforeEach);

		afterEach(Utils.afterEach);

		it('should invoke a callback', () => {
			bender.tools.selection.setWithHtml(
				this.nativeEditor,
				'<a href="http://alloyeditor.com" target="_blank">{Alloy Editor}</a>'
			);

			const buttonLinkEditBrowse = ReactDOM.render(
				<ButtonLinkEditBrowse
					editor={this.editor}
				/>,
				this.container
			);

			const buttons = TestUtils.scryRenderedDOMComponentsWithClass(
				buttonLinkEditBrowse,
				'ae-button'
			);

			const buttonBrowse = buttons[buttons.length - 1];

			Simulate.click(buttonBrowse);

			assert(documentBrowseLinkCallback.called);

			assert(documentBrowseLinkCallback.calledWith(
				this.nativeEditor,
				documentBrowseLinkUrl,
				'_blank'
			));
		});
	});
})();
