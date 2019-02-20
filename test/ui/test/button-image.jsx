import ButtonImage from '../../../src/components/buttons/button-image.jsx';

var assert = chai.assert;

describe('ButtonImage', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should call a click listener of the file input', function() {
		var buttonImage = this.render(<ButtonImage />, this.container);

		var fileInputStub = sinon.spy(function(event) {
			event.preventDefault();
		});

		this.container.firstChild.addEventListener('click', fileInputStub);

		buttonImage.handleClick();

		assert.isTrue(fileInputStub.calledOnce);
	});
});
