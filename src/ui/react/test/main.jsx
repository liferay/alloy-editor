(function() {
    'use strict';

    var assert = chai.assert;

    describe('Main', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should set the hidden property of the state when user interacts with a non-editable node', function(done) {
            var el = document.createElement('p');
            el.setAttribute('contenteditable', false);
            el.setAttribute('id', 'nonEditableEl');
            el.innerHTML = 'This is a non-editable element inside an editable one';
            document.getElementById('editable').appendChild(el);

            var toolbars = {
                styles: {
                    selections: AlloyEditor.Selections,
                    tabIndex: 1
                }
            };

            var mainUI = React.render(<AlloyEditor.UI editor={this.editor} eventsDelay={10} toolbars={toolbars}/>, this.container);

            assert.isFalse(mainUI.state.hidden, 'The state should be hidden initially');

            // Firing directly the event here,
            // Chrome and Firefox do not receive a DOM keyup even when we simulate it on a non-editable element,
            // all IE do however.
            this.nativeEditor.fire('editorInteraction', {
                nativeEvent: {
                    target: el
                }
            });

            setTimeout(function() {
                assert.isTrue(mainUI.state.hidden, 'The state should be hidden on clicking on a non-editable element');

                done();
            }, 50);
        });
    });
}());
