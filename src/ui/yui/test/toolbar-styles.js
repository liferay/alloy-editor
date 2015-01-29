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
        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-bold',
            expected: '<p>There should be <strong>selection</strong> made bold.</p>',
            html: 'There should be {selection} made bold.',
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            }
        }, done);
    });

    it('should remove bold style to a text selection', function(done) {
        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-bold',
            expected: '<p>A bold selection should be removed.</p>',
            html: 'A bold <strong>{selection}</strong> should be removed.',
            beforeAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            },
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), false);
            }
        }, done);
    });

    it('should make a text selection italic', function(done) {
        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-italic',
            expected: '<p>There should be <em>selection</em> made italic.</p>',
            html: 'There should be {selection} made italic.',
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            }
        }, done);
    });

    it('should remove italic style to a text selection', function(done) {
        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-italic',
            expected: '<p>An italic selection should be removed.</p>',
            html: 'An italic <em>{selection}</em> should be removed.',
            beforeAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            },
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), false);
            }
        }, done);
    });

    it('should make a text selection underline', function(done) {
        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-underline',
            expected: '<p>There should be <u>selection</u> made underline.</p>',
            html: 'There should be {selection} made underline.',
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            }
        }, done);
    });

    it('should remove underline style to a text selection', function(done) {
        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-underline',
            expected: '<p>An underline selection should be removed.</p>',
            html: 'An underline <u>{selection}</u> should be removed.',
            beforeAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            },
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), false);
            }
        }, done);
    });

    it('should make a text selection h1', function(done) {
        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-h1',
            expected: '<h1>There should be selection made h1.</h1>',
            html: 'There should be {selection} made h1.',
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            }
        }, done);
    });

    it('should remove h1 style to a text selection', function(done) {
        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-h1',
            expected: '<p>A h1 selection should be removed.</p>',
            html: '<h1>A h1 {selection} should be removed.</h1>',
            beforeAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            },
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), false);
            }
        }, done);
    });

    it('should make a text selection h2', function(done) {
        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-h2',
            expected: '<h2>There should be selection made h2.</h2>',
            html: 'There should be {selection} made h2.',
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            }
        }, done);
    });

    it('should remove h2 style to a text selection', function(done) {
        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-h2',
            expected: '<p>A h2 selection should be removed.</p>',
            html: '<h2>A h2 {selection} should be removed.</h2>',
            beforeAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            },
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), false);
            }
        }, done);
    });

    it('should remove a link selection', function(done) {
        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-link',
            expected: '<p>The link should be selection removed completely.</p>',
            html: 'The link should be <a>{selection}</a> removed completely.',
            beforeAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            },
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), false);
            }
        }, done);

        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-link',
            expected: '<p>The link should be selection removed completely.</p>',
            html: 'The link <a>should be {selection} removed</a> completely.',
            beforeAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            },
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), false);
            }
        }, done);
    });

    it('should remove a twitter link selection', function(done) {
        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-twitter',
            expected: '<p>The link should be selection removed completely.</p>',
            html: 'The link should be <a data-type="twitter-link">{selection}</a> removed completely.',
            beforeAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            },
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), false);
            }
        }, done);

        testButtonAction.call(this, {
            buttonSelector: '.alloy-editor-button .alloy-editor-icon-twitter',
            expected: '<p>The link should be selection removed completely.</p>',
            html: 'The link <a data-type="twitter-link">should be {selection} removed</a> completely.',
            beforeAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), true);
            },
            afterAction: function(button) {
                assert.strictEqual(button.parent().hasClass('yui3-button-selected'), false);
            }
        }, done);
    });

    function testButtonAction(config, callback) {
        var self = this;

        bender.tools.selection.setWithHtml(self.nativeEditor, config.html);

        happen.mouseup(document.getElementById('editable'));

        setTimeout(function() {
            var button = $(config.buttonSelector);

            if (config.beforeAction) {
                config.beforeAction.call(self, button);
            }

            happen.click(button[0]);

            if (config.afterAction) {
                config.afterAction.call(self, button);
            }

            var data = bender.tools.getData(self.nativeEditor, {
                fixHtml: false,
                compatHtml: true
            });

            assert.strictEqual(data, config.expected);

            if (config.beforeCallback) {
                config.beforeCallback.call(self, button);
            }

            callback();
        }, 150);
    }
});