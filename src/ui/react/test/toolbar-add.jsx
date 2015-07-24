(function() {
    'use strict';

    var assert = chai.assert;

    describe('ToolbarAdd', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

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

            var mainUI = React.render(<AlloyEditor.ToolbarAdd editor={this.editor} editorEvent={editorEvent}/>, this.container);

            assert.isNull(React.findDOMNode(mainUI));
        });
    });
}());
