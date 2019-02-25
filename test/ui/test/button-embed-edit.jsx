import ButtonEmbedEdit from '../../../src/components/buttons/button-embed-edit.jsx';

var assert = chai.assert;

var TestUtils = ReactTestUtils;

var Simulate = TestUtils.Simulate;

var KEY_ENTER = 13;

var KEY_ESC = 27;

var getFixture = Utils.getFixture('test/ui/test/fixtures');

var sandbox = sinon.createSandbox();

describe('ButtonEmbedEdit Component', function() {
	beforeEach(Utils.createAlloyEditor);

	afterEach(function(done) {
		sandbox.restore();

		Utils.destroyAlloyEditor.call(this, done);
	});

	it('focuses on the link input as soon as the component gets rendered', function(done) {
		// On IE9 window.requestAnimationFrame does not exist. Avoid this test on IE9
		if (CKEDITOR.env.ie && CKEDITOR.env.version === 9) {
			done();
			return;
		}
		// Make requestAnimationFrame synchronous to avoid unnecessary test delays
		var stub = sandbox
			.stub(window, 'requestAnimationFrame')
			.callsFake(function(callback) {
				callback();
			});

		var buttonEmbedEdit = this.render(
			<ButtonEmbedEdit renderExclusive={true} />,
			this.container
		);

		stub.restore();

		assert.strictEqual(
			document.activeElement,
			buttonEmbedEdit.linkInput.current
		);

		done();
	});

	it('focuses on the link input as soon as the component gets rendered in older browsers', function() {
		// Make setTimeout synchronous to avoid unnecessary test delays
		var requestAnimationFrame = window.requestAnimationFrame;
		var stub = sandbox
			.stub(window, 'setTimeout')
			.callsFake(function(callback) {
				callback();
			});

		window.requestAnimationFrame = null;

		var buttonEmbedEdit = this.render(
			<ButtonEmbedEdit renderExclusive={true} />,
			this.container
		);

		window.requestAnimationFrame = requestAnimationFrame;
		stub.restore();

		assert.strictEqual(
			document.activeElement,
			buttonEmbedEdit.linkInput.current
		);
	});

	it('shows the selected embed url in the link input', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			getFixture('embed.html')
		);

		this.nativeEditor
			.getSelection()
			.selectElement(this.nativeEditor.element.findOne('#embedfoo'));

		var buttonEmbedEdit = this.render(<ButtonEmbedEdit />, this.container);

		assert.strictEqual(
			buttonEmbedEdit.linkInput.current.value,
			'https://foo.com'
		);
	});

	it('removes the embed element when the remove button is clicked', function() {
		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			getFixture('embed.html')
		);

		this.nativeEditor
			.getSelection()
			.selectElement(this.nativeEditor.element.findOne('#embedfoo'));

		var buttonEmbedEdit = this.render(<ButtonEmbedEdit />, this.container);

		var buttonRemove = TestUtils.findRenderedDOMComponentWithClass(
			buttonEmbedEdit,
			'ae-icon-svg-trash'
		);

		Simulate.click(buttonRemove.parentNode);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: true,
			compatHtml: true,
		});

		assert.strictEqual(data, '');
	});

	it('updates the link input value when a different embed element is selected', function() {
		var buttonEmbedEdit;

		bender.tools.selection.setWithHtml(
			this.nativeEditor,
			getFixture('embed_multiple.html')
		);

		this.nativeEditor
			.getSelection()
			.selectElement(this.nativeEditor.element.findOne('#embedfoo'));

		buttonEmbedEdit = this.render(<ButtonEmbedEdit />, this.container);

		assert.strictEqual(
			buttonEmbedEdit.linkInput.current.value,
			'https://foo.com'
		);

		this.nativeEditor
			.getSelection()
			.selectElement(this.nativeEditor.element.findOne('#embedbar'));

		buttonEmbedEdit = this.render(<ButtonEmbedEdit />, this.container);

		assert.strictEqual(
			buttonEmbedEdit.linkInput.current.value,
			'https://bar.com'
		);
	});

	it('does not allow to update the embed link if the link input is empty', function() {
		var buttonEmbedEdit = this.render(<ButtonEmbedEdit />, this.container);

		var buttonOk = TestUtils.findRenderedDOMComponentWithClass(
			buttonEmbedEdit,
			'ae-icon-svg-check'
		);

		assert.isTrue(buttonOk.parentNode.hasAttribute('disabled'));
	});

	it('clears the link input when the remove button inside the link input is clicked', function() {
		var cancelExclusive = sandbox.stub();

		var buttonEmbedEdit = this.render(
			<ButtonEmbedEdit
				cancelExclusive={cancelExclusive}
				renderExclusive={true}
			/>,
			this.container
		);

		var clearButton = TestUtils.findRenderedDOMComponentWithClass(
			buttonEmbedEdit,
			'ae-button-clear'
		);

		var linkInput = buttonEmbedEdit.linkInput.current;

		TestUtils.Simulate.change(linkInput, {
			target: {
				value: 'https://foo.com',
			},
		});

		Simulate.click(clearButton);

		assert.strictEqual(linkInput.value, '');
	});

	it('updates the embed content when the embed url is changed', function() {
		sandbox
			.stub(CKEDITOR.tools, 'jsonp')
			.callsFake(function(fn, data, success, fail) {
				success({
					html: getFixture('embed_content.html'),
				});
			});

		var buttonEmbedEdit = this.render(
			<ButtonEmbedEdit
				cancelExclusive={sandbox.stub()}
				renderExclusive={true}
			/>,
			this.container
		);

		TestUtils.Simulate.change(buttonEmbedEdit.linkInput.current, {
			target: {
				value: 'https://foo.com',
			},
		});

		var buttonOk = TestUtils.findRenderedDOMComponentWithClass(
			buttonEmbedEdit,
			'ae-icon-svg-check'
		).parentNode;

		Simulate.click(buttonOk);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: true,
			compatHtml: true,
		});

		/*IE9 generates <p>&nbsp;</p> tag*/
		assert.oneOf(data, [
			getFixture('embed_content_ie_expected.html'),
			getFixture('embed_content_expected.html'),
		]);
	});

	it('changes the embed content when the KEY_ENTER is pressed inside the link input', function() {
		sandbox
			.stub(CKEDITOR.tools, 'jsonp')
			.callsFake(function(fn, data, success, fail) {
				success({
					html: getFixture('embed_content.html'),
				});
			});

		var buttonEmbedEdit = this.render(
			<ButtonEmbedEdit
				cancelExclusive={sandbox.stub()}
				renderExclusive={true}
			/>,
			this.container
		);

		Simulate.change(buttonEmbedEdit.linkInput.current, {
			target: {
				value: 'https://foo.com',
			},
		});

		Simulate.keyDown(buttonEmbedEdit.linkInput.current, {
			key: 'Enter',
			keyCode: KEY_ENTER,
			which: KEY_ENTER,
		});

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: true,
			compatHtml: true,
		});

		/*IE9 and IE10 generate <p>&nbsp;</p> tag*/
		assert.oneOf(data, [
			getFixture('embed_content_ie_expected.html'),
			getFixture('embed_content_expected.html'),
		]);
	});

	it('close the toolbar when KEY_ESC is pressed inside the link input', function() {
		var spy = sandbox.spy();

		var buttonEmbedEdit = this.render(
			<ButtonEmbedEdit cancelExclusive={spy} renderExclusive={true} />,
			this.container
		);

		Simulate.keyDown(buttonEmbedEdit.linkInput.current, {
			key: 'Escape',
			keyCode: KEY_ESC,
			which: KEY_ESC,
		});

		assert.isTrue(spy.calledOnce);
	});
});
