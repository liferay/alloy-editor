(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;

    describe('ToolbarButtons', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should propagate user\'s configuration to a button', function() {
            var tableAttrs = {
                border: 1,
                cellPadding: 0,
                cellSpacing: 0,
                className: 'rte-table'
            };

            var toolbarAddConfig = {
                buttons: [
                    {
                        name: 'table',
                        cfg: {
                            tableAttributes: tableAttrs
                        }
                    }
                ],
                tabIndex: 2
            };

            var toolbarAdd = TestUtils.renderIntoDocument(<AlloyEditor.ToolbarAdd editor={this.editor} config={toolbarAddConfig} />);

            var buttons = toolbarAdd.getToolbarButtons(toolbarAddConfig.buttons);

            assert.deepEqual(tableAttrs, buttons[0].props.tableAttributes);
        });
    });
}());
