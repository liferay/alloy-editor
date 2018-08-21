(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;
    var Simulate = TestUtils.Simulate;

    describe('ButtonBridge', function() {
        this.timeout(35000);

        before(function(done) {
            Utils.createAlloyEditor.call(this, done, {
                extraPlugins: AlloyEditor.Core.ATTRS.extraPlugins.value + ',ae_buttonbridge,test_buttonbridge'
            });
        });

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should name buttons based on their input params', function() {
            assert.property(AlloyEditor.Buttons, 'ButtonCommand', 'ButtonCommand should have been registered');
            assert.property(AlloyEditor.Buttons, 'ButtonClick', 'ButtonCommand should have been registered');
            assert.property(AlloyEditor.Buttons, 'PasteFromWord', 'PasteFromWord should have been registered');
        });

        it('should create a button with a command in its definition', function() {
            var clickListener = sinon.stub();

            this.nativeEditor.once('buttonCommand', clickListener);

            var button = ReactDOM.render(<AlloyEditor.Buttons.ButtonCommand editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(button));

            assert.isTrue(clickListener.calledOnce);
        });

        it('should create a button with an onClick handler in its definition', function() {
            var clickListener = sinon.stub();

            this.nativeEditor.once('buttonClick', clickListener);

            var button = ReactDOM.render(<AlloyEditor.Buttons.ButtonClick editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(button));

            assert.isTrue(clickListener.calledOnce);
        });

        it('should prevent button definitions from overriding existing buttons', function() {
            var clickListener1 = sinon.stub();
            var clickListener2 = sinon.stub();

            this.nativeEditor.once('buttonClick', clickListener1);
            this.nativeEditor.once('buttonClick2', clickListener2);

            var button = ReactDOM.render(<AlloyEditor.Buttons.ButtonClick editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(button));

            assert.isTrue(clickListener1.calledOnce);
            assert.equal(0, clickListener2.callCount);
        });

        it('should render the button icon with css class or style if it exists in ckeditor', function() {
            var button = ReactDOM.render(<AlloyEditor.Buttons.PasteFromWord editor={this.editor} />, this.container);

            var icon = TestUtils.findRenderedDOMComponentWithClass(button, 'ae-icon-pastefromword');

            assert.ok(icon);
            assert.ok(icon.getAttribute('style'));
        });
    });
}());
