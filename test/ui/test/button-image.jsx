import ButtonImage from '../../../src/components/buttons/button-image.jsx';

(function() {
	'use strict';

	var assert = chai.assert;

	describe('ButtonImage', function() {
		before(Utils.createAlloyEditor);

		after(Utils.destroyAlloyEditor);

		beforeEach(Utils.beforeEach);

		afterEach(Utils.afterEach);

		it('should call a click listener of the file input', function() {
			var buttonImage = ReactDOM.render(
				<ButtonImage editor={this.editor} />,
				this.container
			);

			var fileInputStub = sinon.spy(function(event) {
				event.preventDefault();
			});

			ReactDOM.findDOMNode(
				buttonImage.fileInput.current
			).addEventListener('click', fileInputStub);

			buttonImage.handleClick();

			assert.isTrue(fileInputStub.calledOnce);
		});
	});
})();
