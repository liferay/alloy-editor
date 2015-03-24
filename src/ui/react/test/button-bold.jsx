'use strict';

var assert = chai.assert;

var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;

describe('ButtonBold', function() {
    this.timeout(35000);

    before(function(done) {
        var self = this;

        var editable = document.createElement('div');

        editable.setAttribute('id', 'editable');
        editable.setAttribute('contenteditable', true);

        document.getElementsByTagName('body')[0].appendChild(editable);

        assert.ok(bender);
        assert.ok(CKEDITOR);
        assert.ok(AlloyEditor);

        self.editor = new AlloyEditor({
            toolbars: {},
            srcNode: 'editable'
        });

        self.nativeEditor = self.editor.get('nativeEditor');

        self.nativeEditor.on('instanceReady', function() {
            self.nativeEditor.focus();

            done();
        });
    });

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