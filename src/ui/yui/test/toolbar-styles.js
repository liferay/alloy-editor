'use strict';

var assert = chai.assert;

describe('ToolbarStyles', function() {
    this.timeout(35000);

    before(function(done) {
        var self = this;

        var editable = document.createElement('div');

        editable.setAttribute('id', 'editable');
        editable.setAttribute('contenteditable', true);

        document.getElementsByTagName('body')[0].appendChild(editable);

        YUI().use('alloy-editor', function(Y) {
            assert.ok(bender);
            assert.ok(CKEDITOR);
            assert.ok(happen);
            assert.ok(Y.AlloyEditor);
            assert.ok(YUI);

            self.editor = new Y.AlloyEditor({
                srcNode: '#editable'
            });

            self.nativeEditor = self.editor.get('nativeEditor');

            self.nativeEditor.on('toolbarsReady', function() {
                self.editor.get('nativeEditor').focus();

                done();
            });
        });
    });

    it('should make a text selection bold', function(done) {
        testButton.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-bold',
            expected: '<p>There should be <strong>selection</strong> made bold.</p>',
            html: 'There should be {selection} made bold.'
        }, done);
    });

    it('should make a text selection italic', function(done) {
        testButton.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-italic',
            expected: '<p>There should be <em>selection</em> made italic.</p>',
            html: 'There should be {selection} made italic.'
        }, done);
    });

    it('should make a text selection underline', function(done) {
        testButton.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-underline',
            expected: '<p>There should be <u>selection</u> made underline.</p>',
            html: 'There should be {selection} made underline.'
        }, done);
    });

    it('should make a text selection h1', function(done) {
        testButton.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-h1',
            expected: '<h1>There should be selection made h1.</h1>',
            html: 'There should be {selection} made h1.'
        }, done);
    });

    it('should make a text selection h2', function(done) {
        testButton.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-h2',
            expected: '<h2>There should be selection made h2.</h2>',
            html: 'There should be {selection} made h2.'
        }, done);
    });

    function testButton(config, callback) {
        var self = this;

        bender.tools.selection.setWithHtml(self.nativeEditor, config.html);

        happen.mouseup(document.getElementById('editable'));

        setTimeout(function() {
            var button = $(config.buttonSelector);

            happen.click(button[0]);

            assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);

            var data = bender.tools.getData(self.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, config.expected);

            callback();
        }, 150);
    }
});