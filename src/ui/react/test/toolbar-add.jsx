(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;

    describe('ToolbarAdd', function() {
        this.timeout(35000);

        describe('test focusing', function() {
            var editorConfig = {
                eventsDelay: 0,
                toolbars: {
                    add: {}
                },
                uicore: {
                    timeout: 0
                }
            };

            before(function (done) {
                Utils.createAlloyEditor.call(this, done, editorConfig);
            });

            after(Utils.destroyAlloyEditor);

            beforeEach(Utils.beforeEach);

            afterEach(Utils.afterEach);

            it('should not render when user interacts with a non-editable node', function() {
                var editorEvent = {
                    data: {
                        nativeEvent: {
                            target: {
                                isContentEditable: false
                            }
                        }
                    }
                };

                var mainUI = ReactDOM.render(<AlloyEditor.ToolbarAdd editor={this.editor} editorEvent={editorEvent}/>, this.container);

                assert.isNull(ReactDOM.findDOMNode(mainUI));
            });

            it('should render in the focused editor', function (done) {
                // Test passes on IE11 and Windows 7 locally, fails when executed by
                // Travis on SauceLabs, so it will be disabled
                if (CKEDITOR.env.ie && CKEDITOR.env.version === 11) {
                    done();
                    return;
                }

                var blurDelay = CKEDITOR.focusManager._.blurDelay;

                CKEDITOR.focusManager._.blurDelay = false;

                var empty = document.createElement('div');

                var editable2 = document.createElement('div');

                document.getElementsByTagName('body')[0].appendChild(editable2);

                document.getElementsByTagName('body')[0].appendChild(empty);

                var editor2 = AlloyEditor.editable(editable2, editorConfig);
                var nativeEditor2 = editor2.get('nativeEditor');

                nativeEditor2.on('instanceReady', function() {
                    var buttons;

                    // Editor1 is focused and should show the add toolbar. Editor2 should not.
                    buttons = TestUtils.scryRenderedDOMComponentsWithClass(this.editor._mainUI, 'ae-button-add');

                    assert.equal(buttons.length, 1, 'Editor1 is focused. It should show the add toolbar');

                    buttons = TestUtils.scryRenderedDOMComponentsWithClass(editor2._mainUI, 'ae-button-add');

                    assert.equal(buttons.length, 0, 'Editor2 is not focused. It should not show the add toolbar');

                    happen.mousedown(editable2);
                    Utils.focusEditor(nativeEditor2);

                    // Editor2 is focused and should show the add toolbar. Editor1 should not.
                    setTimeout(function () {
                        buttons = TestUtils.scryRenderedDOMComponentsWithClass(this.editor._mainUI, 'ae-button-add');

                        assert.equal(buttons.length, 0, 'Editor1 is not focused. It should not show the add toolbar');

                        buttons = TestUtils.scryRenderedDOMComponentsWithClass(editor2._mainUI, 'ae-button-add');

                        assert.equal(buttons.length, 1, 'Editor2 is focused. It should show the add toolbar');

                        happen.mousedown(empty);

                        // None of the editors is focused. None of them should show the add toolbar.
                        buttons = TestUtils.scryRenderedDOMComponentsWithClass(this.editor._mainUI, 'ae-button-add');

                        assert.equal(buttons.length, 0, 'Editor1 is not focused. It should not show the add toolbar');

                        buttons = TestUtils.scryRenderedDOMComponentsWithClass(editor2._mainUI, 'ae-button-add');

                        assert.equal(buttons.length, 0, 'Editor1 is not focused. It should not show the add toolbar');

                        CKEDITOR.focusManager._.blurDelay = blurDelay;

                        done();
                    }.bind(this), 0);
                }.bind(this));
            });
        });

        describe('test rendering', function() {
            var editorConfig = {
                eventsDelay: 0,
                toolbars: {
                    add: {
                        position: AlloyEditor.ToolbarAdd.right
                    }
                },
                uicore: {
                    timeout: 0
                }
            };

            before(function (done) {
                Utils.createAlloyEditor.call(this, done, editorConfig);
            });

            after(Utils.destroyAlloyEditor);

            beforeEach(Utils.beforeEach);

            afterEach(Utils.afterEach);

            it('should render the toolbar on right', function() {
                // Test passes on IE11 and Windows 7 locally, fails when executed by
                // Travis on SauceLabs, so it will be disabled
                if (CKEDITOR.env.ie && CKEDITOR.env.version === 11) {
                    return;
                }

                var editable = this.nativeEditor.editable();
                happen.mousedown(editable);

                var toolbarAdd = TestUtils.findRenderedDOMComponentWithClass(this.editor._mainUI, 'ae-toolbar-add');

                var domNode = ReactDOM.findDOMNode(toolbarAdd);

                assert.isTrue(domNode.offsetLeft > editable.$.offsetLeft);
            });
        });
    });
}());
