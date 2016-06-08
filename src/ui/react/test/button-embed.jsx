(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;
    var TestUtils = React.addons.TestUtils;

    describe('ButtonEmbed Component', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should render just the embed button when not in exclusive mode', function() {
            var buttonEmbed = ReactDOM.render(<AlloyEditor.ButtonEmbed cancelExclusive={sinon.stub()} editor={this.editor} renderExclusive={false} />, this.container);

            var button = TestUtils.findRenderedDOMComponentWithTag(buttonEmbed, 'button');

            var editLink = TestUtils.scryRenderedDOMComponentsWithClass(buttonEmbed, 'ae-container-edit-link');

            assert.ok(button);
            assert.notOk(editLink.length);
        });

        it('should show the embed edit button when in exclusive mode', function() {
            var buttonEmbed = ReactDOM.render(<AlloyEditor.ButtonEmbed cancelExclusive={sinon.stub()} editor={this.editor} renderExclusive={true} />, this.container);

            var editLink = TestUtils.findRenderedDOMComponentWithClass(buttonEmbed, 'ae-container-edit-link');

            assert.ok(editLink);
        });

        it('should invoke requestExclusive when clicking on the button', function() {
            var requestExclusiveListener = sinon.stub();

            var buttonEmbed = ReactDOM.render(<AlloyEditor.ButtonEmbed editor={this.editor} requestExclusive={requestExclusiveListener} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonEmbed));

            assert.isTrue(requestExclusiveListener.calledOnce);
        });
    });
}());