(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;
    var TestUtils = React.addons.TestUtils;

    describe('ButtonTargetList', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should ButtonTargetList dropdown component when dropdown button is pressed', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, 'There should be a <a>{selection}</a> made bold.');

            var buttonLink = ReactDOM.render(<AlloyEditor.ButtonLinkEdit editor={this.editor} />, this.container);

            var buttonLinkTargetEditRendered = TestUtils.scryRenderedComponentsWithType(buttonLink, AlloyEditor.ButtonLinkTargetEdit);

            var button = ReactDOM.findDOMNode(buttonLinkTargetEditRendered[0]).getElementsByTagName('button')[0];

            Simulate.click(button);

            var ButtonDropdown = TestUtils.scryRenderedComponentsWithType(buttonLink, AlloyEditor.ButtonDropdown);

            var ButtonTargetList = TestUtils.scryRenderedComponentsWithType(buttonLink, AlloyEditor.ButtonTargetList);

            assert.strictEqual(ButtonTargetList.length, 1);

            assert.strictEqual(ButtonDropdown.length, 1);
        });
    });
}());
