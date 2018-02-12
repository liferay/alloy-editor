(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;

    describe('ButtonStylesList', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should render remove styles button by default', function() {
            var styles = [
                {
                    name: AlloyEditor.Strings.h1,
                    style: {
                        element: 'h1'
                    }
                }
            ];

            var buttonStylesList = ReactDOM.render(<AlloyEditor.ButtonStylesList editor={this.editor} styles={styles} />, this.container);

            assert.isObject(TestUtils.findRenderedComponentWithType(buttonStylesList, AlloyEditor.ButtonStylesListItemRemove));
        });

        it('should prevent rendering of remove styles button', function() {
            var styles = [
                {
                    name: AlloyEditor.Strings.h1,
                    style: {
                        element: 'h1'
                    }
                }
            ];

            var buttonStylesList = ReactDOM.render(<AlloyEditor.ButtonStylesList editor={this.editor} showRemoveStylesItem={false} styles={styles} />, this.container);

            assert.throws(function() {
                TestUtils.findRenderedComponentWithType(buttonStylesList, AlloyEditor.ButtonStylesListItemRemove)
            });
        });
    });
}());
