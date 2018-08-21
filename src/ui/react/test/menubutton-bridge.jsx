(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;
    var Simulate = TestUtils.Simulate;

    describe('MenuButtonBridge', function() {
        this.timeout(35000);

        before(function(done) {
            Utils.createAlloyEditor.call(this, done, {
                extraPlugins: AlloyEditor.Core.ATTRS.extraPlugins.value + ',ae_menubridge,ae_menubuttonbridge,test_menubuttonbridge'
            });
        });

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should create a menu button', function() {
            assert.property(AlloyEditor.Buttons, 'ButtonMenuButton', 'ButtonMenuButton should have been registered');
        });

        it('should render just the menuButton button when not expanded', function() {
            var menuButton = ReactDOM.render(<AlloyEditor.Buttons.ButtonMenuButton editor={this.editor} expanded={false} />, this.container);

            var menuButtonButton = TestUtils.findRenderedDOMComponentWithTag(menuButton, 'button');

            var dropdown = TestUtils.scryRenderedDOMComponentsWithClass(menuButton, 'ae-dropdown');

            assert.ok(menuButtonButton);
            assert.equal(0, dropdown.length);
        });

        it('should show a dropdown with the menu items that have a valid group when expanded', function() {
            var menuButton = ReactDOM.render(<AlloyEditor.Buttons.ButtonMenuButton editor={this.editor} expanded={true} />, this.container);

            var dropdown = TestUtils.findAllInRenderedTree(menuButton, function(component) {
                return TestUtils.isCompositeComponentWithType(component, AlloyEditor.ButtonDropdown);
            });

            assert.ok(dropdown);
            assert.equal(1, dropdown.length);

            var menu = TestUtils.scryRenderedDOMComponentsWithClass(dropdown[0], 'ae-dropdown')[0];

            assert.ok(menu);

            var menuItems = TestUtils.findAllInRenderedTree(dropdown[0], function(component) {
                return component.tagName === 'LI';
            });

            assert.equal(2, menuItems.length);
        });

        it('should execute the onClick or command methods of the menu items when clicked', function() {
            var stub = sinon.stub();

            this.nativeEditor.execCommand = stub;

            var menuButton = ReactDOM.render(<AlloyEditor.Buttons.ButtonMenuButton editor={this.editor} expanded={true} />, this.container);

            var dropdown = TestUtils.findAllInRenderedTree(menuButton, function(component) {
                return TestUtils.isCompositeComponentWithType(component, AlloyEditor.ButtonDropdown);
            });

            var menuItems = TestUtils.findAllInRenderedTree(dropdown[0], function(component) {
                return component.tagName === 'BUTTON';
            });

            menuItems.forEach(function(menuItem) {
                Simulate.click(ReactDOM.findDOMNode(menuItem));
            });

            assert.strictEqual(stub.callCount, 2);
        });
    });
}());
