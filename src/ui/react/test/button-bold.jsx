'use strict';

var assert = chai.assert;
var Simulate = React.addons.TestUtils.Simulate;

describe('ButtonBold', function() {
    this.timeout(35000);

    before(Utils.createAlloyEditor);

    beforeEach(function() {
        this.btnContainer = document.createElement('div');

        document.body.appendChild(this.btnContainer);
    });

    afterEach(function() {
        document.body.removeChild(this.btnContainer);
    });

    it('should make a text selection bold', function() {
        var buttonBold = React.render(<global.AlloyEditor.ButtonBold editor={this.editor} />, this.btnContainer);

        bender.tools.selection.setWithHtml(this.nativeEditor, 'There should be a {selection} made bold.');

        Simulate.click(React.findDOMNode(buttonBold));

        var data = bender.tools.getData(this.nativeEditor, {
            fixHtml: false,
            compatHtml: true
        });

        assert.strictEqual(data, '<p>There should be a <strong>selection</strong> made bold.</p>');
    });
});