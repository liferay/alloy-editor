(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    var KEY_L = 76;

    describe('ButtonLink', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should invoke requestExclusive when clicking on the button', function() {
            var requestExclusiveListener = sinon.stub();

            var buttonLink = ReactDOM.render(<AlloyEditor.ButtonLink editor={this.editor} requestExclusive={requestExclusiveListener} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonLink));

            assert.isTrue(requestExclusiveListener.calledOnce);
        });

        it('should invoke requestExclusive when pressing the keystroke [Ctrl|Cmd]+L', function() {
            var requestExclusiveListener = sinon.stub();

            ReactDOM.render(<AlloyEditor.ButtonLink editor={this.editor} requestExclusive={requestExclusiveListener} />, this.container);

            happen.keydown(this._editable, {
                ctrlKey: true,
                keyCode: KEY_L
            });

            assert.isTrue(requestExclusiveListener.calledOnce);
        });
    });
}());
