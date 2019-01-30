import ButtonLinkEditBrowse from '../../../src/components/buttons/button-link-edit-browse.jsx';

(function() {
	'use strict';

	var assert = chai.assert;
	var Simulate = ReactTestUtils.Simulate;
	var TestUtils = ReactTestUtils;
	var documentBrowseLinkCallback;
	var documentBrowseLinkUrl = 'http://alloyeditor.com/some/location';

	describe('ButtonLinkEditBrowse', function() {
		before(function(done) {
			documentBrowseLinkCallback = sinon.spy();

			Utils.createAlloyEditor.call(this, done, {
				documentBrowseLinkCallback: documentBrowseLinkCallback,
				documentBrowseLinkUrl: documentBrowseLinkUrl
			});
		});

		after(Utils.destroyAlloyEditor);

		beforeEach(Utils.beforeEach);

		afterEach(Utils.afterEach);

		it('should invoke a callback', function() {
			bender.tools.selection.setWithHtml(
				this.nativeEditor,
				'<a href="http://alloyeditor.com" target="_blank">{Alloy Editor}</a>'
			);

			var buttonLinkEditBrowse = ReactDOM.render(
				<ButtonLinkEditBrowse
					editor={this.editor}
				/>,
				this.container
			);

			var buttons = TestUtils.scryRenderedDOMComponentsWithClass(
				buttonLinkEditBrowse,
				'ae-button'
			);

			var buttonBrowse = buttons[buttons.length - 1];

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
