(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;
    var TestUtils = React.addons.TestUtils;
    var buttons;
    describe('ToolbarAdd', function() {
        this.timeout(35000);

        before(function (done) {
            Utils.createAlloyEditor.call(this, done, {
                toolbars: {
                    add: {
                        buttons: ['image', 'video'],
                        tabIndex: 2
                    }
                }
            });
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

        it('Should toolbaradd toggle between content editables', function (done) {
            var empty = document.createElement('div');


            var editable2 = document.createElement('div');

            editable2.setAttribute('id', 'editable2');

            editable2.setAttribute('contenteditable', true);

            document.getElementsByTagName('body')[0].appendChild(editable2);

            document.getElementsByTagName('body')[0].appendChild(empty);

            var editor2 = AlloyEditor.editable('editable2', {
                toolbars: {
                    add: {
                        buttons: ['image', 'video'],
                        tabIndex: 2
                    }
                }
            });

            var nativeEditor2 = editor2.get('nativeEditor');

            buttons = TestUtils.scryRenderedDOMComponentsWithClass(this.editor._mainUI, 'ae-button-add');


            happen.mousedown(this._editable);

            setTimeout(function () {
                buttons = TestUtils.scryRenderedDOMComponentsWithClass(this.editor._mainUI, 'ae-button-add');

                assert.equal(buttons.length, 1, 'ae-button-add found into this.editor mousedown editable');

                buttons = TestUtils.scryRenderedDOMComponentsWithClass(editor2._mainUI, 'ae-button-add');

                assert.equal(buttons.length, 0, 'ae-button-add didnt found into editor2 mousedown editable');

                happen.mousedown(editable2);

                setTimeout(function () {

                    buttons = TestUtils.scryRenderedDOMComponentsWithClass(this.editor._mainUI, 'ae-button-add');

                    assert.equal(buttons.length, 0, 'ae-button-add didnt found into this.editor mousedown editable2');

                    buttons = TestUtils.scryRenderedDOMComponentsWithClass(editor2._mainUI, 'ae-button-add');

                    assert.equal(buttons.length, 1, 'ae-button-add found into editor2 mousedown editable2');

                    happen.mousedown(empty);

                    setTimeout(function () {
                        buttons = TestUtils.scryRenderedDOMComponentsWithClass(this.editor._mainUI, 'ae-button-add');

                        assert.equal(buttons.length, 0, 'ae-button-add didnt found into this.editor mousedown outside div');

                        buttons = TestUtils.scryRenderedDOMComponentsWithClass(editor2._mainUI, 'ae-button-add');

                        assert.equal(buttons.length, 0, 'ae-button-add didnt found into editor 2 mousedown outside div');

                        done();

                    }.bind(this), 500);

                }.bind(this), 500);

            }.bind(this), 500);
        });

    });
}());
