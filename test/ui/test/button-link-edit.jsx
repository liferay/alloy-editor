import ButtonLinkEdit from '../../../src/components/buttons/button-link-edit.jsx';
import ButtonLinkTargetEdit from '../../../src/components/buttons/button-link-target-edit.jsx';

var assert = chai.assert;
var Simulate = ReactTestUtils.Simulate;
var TestUtils = ReactTestUtils;

describe('ButtonLink', function() {
	beforeEach(Utils.createAlloyEditor);
	afterEach(Utils.destroyAlloyEditor);

	it('should create link with default http protocol', function() {
		bender.tools.selection.setWithHtml(this.nativeEditor, '{selection}');

		var requestExclusiveListener = sinon.stub();

		var cancelExclusive = sinon.stub();

		var buttonLink = this.render(
			<ButtonLinkEdit
				cancelExclusive={cancelExclusive}
				requestExclusive={requestExclusiveListener}
			/>,
			this.container
		);

		var inputLink = TestUtils.findRenderedDOMComponentWithTag(
			buttonLink,
			'input'
		);

		TestUtils.Simulate.change(inputLink, {target: {value: 'link.com'}});

		var buttonOk = TestUtils.findRenderedDOMComponentWithClass(
			buttonLink,
			'ae-icon-svg-check'
		);

		Simulate.click(buttonOk.parentNode);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: true,
			compatHtml: true,
		});

		assert.strictEqual(
			'<p><a href="http://link.com" target="">selection</a></p>',
			data
		);
	});

	it('should create link without protocol', function() {
		bender.tools.selection.setWithHtml(this.nativeEditor, '{selection}');

		var requestExclusiveListener = sinon.stub();

		var cancelExclusive = sinon.stub();

		var buttonLink = this.render(
			<ButtonLinkEdit
				appendProtocol={false}
				cancelExclusive={cancelExclusive}
				requestExclusive={requestExclusiveListener}
			/>,
			this.container
		);

		var inputLink = TestUtils.findRenderedDOMComponentWithTag(
			buttonLink,
			'input'
		);

		TestUtils.Simulate.change(inputLink, {target: {value: 'link.com'}});

		var buttonOk = TestUtils.findRenderedDOMComponentWithClass(
			buttonLink,
			'ae-icon-svg-check'
		);

		Simulate.click(buttonOk.parentNode);

		var data = bender.tools.getData(this.nativeEditor, {
			fixHtml: true,
			compatHtml: true,
		});

		assert.strictEqual(
			'<p><a href="link.com" target="">selection</a></p>',
			data
		);
	});

	it('should propagate `allowedTargets` property to `ButtonLinkTargetEdit`', function() {
		var allowedTargets = [
			{
				label: AlloyEditor.Strings.linkTargetDefault,
				value: '',
			},
			{
				label: AlloyEditor.Strings.linkTargetBlank,
				value: '_blank',
			},
		];

		var buttonLink = this.render(
			<ButtonLinkEdit allowedTargets={allowedTargets} />,
			this.container
		);

		var buttonLinkTargetEdit = TestUtils.findRenderedComponentWithType(
			buttonLink,
			ButtonLinkTargetEdit
		);

		assert.strictEqual(
			allowedTargets,
			buttonLinkTargetEdit.props.allowedTargets
		);
	});

	it('should render target selector on link edit button', function() {
		var allowedTargets = [
			{
				label: AlloyEditor.Strings.linkTargetDefault,
				value: '',
			},
			{
				label: AlloyEditor.Strings.linkTargetBlank,
				value: '_blank',
			},
		];

		var buttonLink = this.render(
			<ButtonLinkEdit allowedTargets={allowedTargets} />,
			this.container
		);

		var buttonLinkTargetEditRendered = TestUtils.scryRenderedComponentsWithType(
			buttonLink,
			ButtonLinkTargetEdit
		);

		assert.strictEqual(buttonLinkTargetEditRendered.length, 1);
	});

	it('should not render target selector on link edit button when passing showTargetSelector property as false', function() {
		var showTargetSelector = false;

		var buttonLink = this.render(
			<ButtonLinkEdit showTargetSelector={showTargetSelector} />,
			this.container
		);

		var buttonLinkTargetEditRendered = TestUtils.scryRenderedComponentsWithType(
			buttonLink,
			ButtonLinkTargetEdit
		);

		assert.strictEqual(buttonLinkTargetEditRendered.length, 0);
	});
});
