(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;
    var Simulate = TestUtils.Simulate;

    describe('RichComboBridge', function() {
        this.timeout(35000);

        before(function(done) {
            Utils.createAlloyEditor.call(this, done, {
                extraPlugins: AlloyEditor.Core.ATTRS.extraPlugins.value + ',ae_richcombobridge,test_richcombobridge'
            });
        });

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should create a rich combo and invoke its initialization methods', function() {
            assert.property(AlloyEditor.Buttons, 'ButtonRichCombo', 'ButtonRichCombo should have been registered');

            var initListener = sinon.stub();

            this.nativeEditor.once('richComboInit', initListener);

            var renderListener = sinon.stub();

            this.nativeEditor.once('richComboRender', renderListener);

            React.render(<AlloyEditor.Buttons.ButtonRichCombo editor={this.editor} />, this.container);

            assert.isTrue(initListener.calledOnce);
            assert.isTrue(renderListener.calledOnce);
        });

        it('should render just the menu button when not expanded', function() {
            var buttonRichCombo = React.render(<AlloyEditor.Buttons.ButtonRichCombo editor={this.editor} expanded={false} />, this.container);

            var menuButton = TestUtils.findRenderedDOMComponentWithTag(buttonRichCombo, 'button');

            var dropdown = TestUtils.scryRenderedDOMComponentsWithClass(buttonRichCombo, 'ae-dropdown');

            assert.ok(menuButton);
            assert.equal(0, dropdown.length);
        });

        it('should show a dropdown with the action buttons when expanded', function() {
            var buttonRichCombo = React.render(<AlloyEditor.Buttons.ButtonRichCombo editor={this.editor} expanded={true} />, this.container);

            var dropdown = TestUtils.findRenderedDOMComponentWithClass(buttonRichCombo, 'ae-dropdown');
            var actionButtons = TestUtils.scryRenderedDOMComponentsWithTag(dropdown, 'button');

            assert.ok(dropdown);
            assert.ok(actionButtons.length);
        });

        it('should show a dropdown with the action buttons when expanded', function() {
            var buttonRichCombo = React.render(<AlloyEditor.Buttons.ButtonRichCombo editor={this.editor} expanded={true} />, this.container);

            var dropdown = TestUtils.findRenderedDOMComponentWithClass(buttonRichCombo, 'ae-dropdown');
            var actionButtons = TestUtils.scryRenderedDOMComponentsWithTag(dropdown, 'button');

            assert.ok(dropdown);
            assert.ok(actionButtons.length);
        });

        it('should execute the onClick method with the item value when clicking on an item', function() {
            var clickListener = sinon.stub();

            var clickListenerProxy = function(event) {
                clickListener(event.data);
            };

            this.nativeEditor.once('richComboClick', clickListenerProxy);

            var buttonRichCombo = React.render(<AlloyEditor.Buttons.ButtonRichCombo editor={this.editor} expanded={true} />, this.container);

            var dropdown = TestUtils.findRenderedDOMComponentWithClass(buttonRichCombo, 'ae-dropdown');

            var richComboItem = TestUtils.findAllInRenderedTree(dropdown, function(component) {
                return component.props['data-value'] === 'entry2';
            });

            Simulate.click(React.findDOMNode(richComboItem[0]));

            assert.isTrue(clickListener.calledOnce);
            assert.isTrue(clickListener.calledWith('entry2'));
        });
    });
}());
