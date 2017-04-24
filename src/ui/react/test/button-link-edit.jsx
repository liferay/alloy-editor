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