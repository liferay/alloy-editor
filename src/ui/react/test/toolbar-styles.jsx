(function() {
    'use strict';

    var assert = chai.assert;

    describe('ToolbarStyles', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should constrain the toolbar\'s position', function() {
            var toolbarStyles = React.render(<AlloyEditor.ToolbarStyles editor={this.editor}/>, this.container);

            var res = toolbarStyles.getConstrainedPosition({
                height: 50,
                left: 0,
                top: -20,
                width: 300
            }, {
                width: 200
            });

            assert.strictEqual(-100, res.x);
            assert.strictEqual(0, res.y);

            res = toolbarStyles.getConstrainedPosition({
                height: 50,
                left: 0,
                top: -20,
                width: 300
            });

            assert.strictEqual(0, res.y);
        });
    });
}());
