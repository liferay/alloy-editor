(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;
    var TestUtils = React.addons.TestUtils;

    describe('ButtonLink', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should create link with default http protocol', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '{selection}');

            var requestExclusiveListener = sinon.stub();

            var cancelExclusive = sinon.stub();

            var buttonLink = ReactDOM.render(<AlloyEditor.ButtonLinkEdit editor={this.editor} cancelExclusive={cancelExclusive} requestExclusive={requestExclusiveListener} />, this.container);

            var inputLink = TestUtils.findRenderedDOMComponentWithTag(buttonLink, 'input');

            TestUtils.Simulate.change(inputLink, {target: {value: 'link.com'}});

            var buttonOk = TestUtils.findRenderedDOMComponentWithClass(buttonLink, 'ae-icon-ok');

            Simulate.click(buttonOk.parentNode);

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual('<p><a href="http://link.com" target="">selection</a></p>', data);
        });

        it('should create link without protocol', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '{selection}');

            var requestExclusiveListener = sinon.stub();

            var cancelExclusive = sinon.stub();

            var buttonLink = ReactDOM.render(<AlloyEditor.ButtonLinkEdit editor={this.editor} appendProtocol={false} cancelExclusive={cancelExclusive} requestExclusive={requestExclusiveListener} />, this.container);

            var inputLink = TestUtils.findRenderedDOMComponentWithTag(buttonLink, 'input');

            TestUtils.Simulate.change(inputLink, {target: {value: 'link.com'}});

            var buttonOk = TestUtils.findRenderedDOMComponentWithClass(buttonLink, 'ae-icon-ok');

            Simulate.click(buttonOk.parentNode);

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual('<p><a href="link.com" target="">selection</a></p>', data);
        });

        it('should propagate `allowedTargets` property to `ButtonLinkTargetEdit`', function() {
            var allowedTargets = [
                {
                    label: AlloyEditor.Strings.linkTargetDefault,
                    value: ''
                }, {
                    label: AlloyEditor.Strings.linkTargetBlank,
                    value: '_blank'
                }
            ];

            var buttonLink = ReactDOM.render(<AlloyEditor.ButtonLinkEdit editor={this.editor} allowedTargets={allowedTargets} />, this.container);

            var buttonLinkTargetEdit = TestUtils.findRenderedComponentWithType(buttonLink, AlloyEditor.ButtonLinkTargetEdit);

            assert.strictEqual(allowedTargets, buttonLinkTargetEdit.props.allowedTargets);
        });

        it('should render target selector on link edit button', function() {
            var allowedTargets = [
                {
                    label: AlloyEditor.Strings.linkTargetDefault,
                    value: ''
                }, {
                    label: AlloyEditor.Strings.linkTargetBlank,
                    value: '_blank'
                }
            ];

            var buttonLink = ReactDOM.render(<AlloyEditor.ButtonLinkEdit editor={this.editor} allowedTargets={allowedTargets} />, this.container);

            var buttonLinkTargetEditRendered = TestUtils.scryRenderedComponentsWithType(buttonLink, AlloyEditor.ButtonLinkTargetEdit);

            assert.strictEqual(buttonLinkTargetEditRendered.length, 1);
        });

        it('should not render target selector on link edit button when passing showTargetSelector property as false', function() {

            var showTargetSelector = false;

            var buttonLink = ReactDOM.render(<AlloyEditor.ButtonLinkEdit editor={this.editor} showTargetSelector={showTargetSelector} />, this.container);

            var buttonLinkTargetEditRendered = TestUtils.scryRenderedComponentsWithType(buttonLink, AlloyEditor.ButtonLinkTargetEdit);

            assert.strictEqual(buttonLinkTargetEditRendered.length, 0);
        });
    });
}());