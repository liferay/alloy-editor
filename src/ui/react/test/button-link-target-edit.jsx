(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;

    describe('ButtonLinkTargetEdit', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should render ButtonLinkTargetEdit into ButtonLinkEdit by default', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'There should be a <a>{selection}</a> made bold.');

            var buttonLink = ReactDOM.render(<AlloyEditor.ButtonLinkEdit editor={this.editor} />, this.container);

            var buttonLinkTargetEditRendered = TestUtils.scryRenderedComponentsWithType(buttonLink, AlloyEditor.ButtonLinkTargetEdit);

            assert.strictEqual(buttonLinkTargetEditRendered.length, 1);
        });

        it('should dont render ButtonLinkTargetEdit when showTargetSelector is false', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'There should be a <a>{selection}</a> made bold.');

            var buttonLink = ReactDOM.render(<AlloyEditor.ButtonLinkEdit editor={this.editor} showTargetSelector={false}/>, this.container);

            var buttonLinkTargetEditRendered = TestUtils.scryRenderedComponentsWithType(buttonLink, AlloyEditor.ButtonLinkTargetEdit);

            assert.strictEqual(buttonLinkTargetEditRendered.length, 0);
        });
    });
}());
