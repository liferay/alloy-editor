'use strict';

var assert = chai.assert;
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;

describe('ButtonTableRemove', function() {
    this.timeout(35000);

    before(Utils.createAlloyEditor);

    after(Utils.destroyAlloyEditor);

    beforeEach(Utils.beforeEach);

    afterEach(Utils.afterEach);

    it('should remove a table if selection is inside one', function() {
        var buttonTableRemove = React.render(<global.AlloyEditor.ButtonTableRemove editor={this.editor} />, this.container);

        bender.tools.selection.setWithHtml(this.nativeEditor, '<table><tbody><tr><td> {}</td></tr></tbody></table>');

        Simulate.click(React.findDOMNode(buttonTableRemove));

        var data = bender.tools.getData(this.nativeEditor, {
            fixHtml: false,
            compatHtml: true
        });

        assert.strictEqual(data, '');
    });

    it('should noop if selection is outside a table', function() {
        var buttonTableRemove = React.render(<global.AlloyEditor.ButtonTableRemove editor={this.editor} />, this.container);

        bender.tools.selection.setWithHtml(this.nativeEditor, 'Content with {no} table');

        Simulate.click(React.findDOMNode(buttonTableRemove));

        var data = bender.tools.getData(this.nativeEditor, {
            fixHtml: false,
            compatHtml: true
        });

        assert.strictEqual(data, '<p>Content with no table</p>');
    });
});