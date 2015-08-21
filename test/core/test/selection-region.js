(function() {
    'use strict';

    var assert = chai.assert;

    describe('SelectionRegion', function() {
        this.timeout(35000);

        describe('with focusing the editor after instance create', function() {
            before(function(done) {
                Utils.createCKEditor.call(this, done, {
                    extraPlugins: 'ae_selectionregion'
                });
            });

            after(Utils.destroyCKEditor);

            beforeEach(Utils.beforeEach);

            afterEach(Utils.afterEach);

            it('should create selection from range', function() {
                this.nativeEditor.setData('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus augue a scelerisque imperdiet. Nunc quis nunc dolor. Nunc nisl felis, lacinia eu condimentum quis, interdum in tellus. Donec eget ipsum sed felis egestas euismod ultricies at arcu. Suspendisse potenti. Curabitur sed augue in sem efficitur fermentum ac quis mi. Fusce volutpat feugiat justo, non hendrerit justo bibendum eu. Maecenas pellentesque urna vitae odio condimentum, suscipit tempus nibh interdum. Fusce lacinia magna et nisl vestibulum, nec viverra nisl tempus. Curabitur viverra, arcu a vehicula imperdiet, lectus nisi faucibus velit, eget sodales ante lacus nec ligula. Morbi in placerat ligula. Maecenas volutpat sem id augue elementum auctor.');

                var editable = this.nativeEditor.editable();

                var region = editable.getClientRect();

                // Add - 5 or + 5 to make sure the points are in the editable area
                this.nativeEditor.createSelectionFromRange(region.left + 5, region.top + 5, region.right - 5, region.bottom - 5);

                assert.isFalse(this.nativeEditor.isSelectionEmpty());
            });

            it('should create empty selection from point', function() {
                this.nativeEditor.setData('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus augue a scelerisque imperdiet. Nunc quis nunc dolor. Nunc nisl felis, lacinia eu condimentum quis, interdum in tellus. Donec eget ipsum sed felis egestas euismod ultricies at arcu. Suspendisse potenti. Curabitur sed augue in sem efficitur fermentum ac quis mi. Fusce volutpat feugiat justo, non hendrerit justo bibendum eu. Maecenas pellentesque urna vitae odio condimentum, suscipit tempus nibh interdum. Fusce lacinia magna et nisl vestibulum, nec viverra nisl tempus. Curabitur viverra, arcu a vehicula imperdiet, lectus nisi faucibus velit, eget sodales ante lacus nec ligula. Morbi in placerat ligula. Maecenas volutpat sem id augue elementum auctor.');

                var editable = this.nativeEditor.editable();

                var region = editable.getClientRect();

                // Add - 5 or + 5 to make sure the points are in the editable area
                this.nativeEditor.createSelectionFromPoint(region.left + 5, region.top + 5);

                assert.isTrue(this.nativeEditor.isSelectionEmpty());
            });

            it('should retrieve the caret region', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, 'The caret shoud be in this {selection}.');

                var caretRegion = this.nativeEditor.getCaretRegion();

                assert.isObject(caretRegion);
                assert.property(caretRegion, 'bottom');
                assert.property(caretRegion, 'left');
                assert.property(caretRegion, 'right');
                assert.property(caretRegion, 'top');
            });

            it('should check if the selection is empty', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, 'The selection should be empty in this case.');
                var isSelectionEmpty = this.nativeEditor.isSelectionEmpty();
                assert.isTrue(isSelectionEmpty);

                bender.tools.selection.setWithHtml(this.nativeEditor, 'The selection should {not} be empty in this case.');
                isSelectionEmpty = this.nativeEditor.isSelectionEmpty();
                assert.isFalse(isSelectionEmpty);
            });

            it('should retrieve client selection regions', function () {
                bender.tools.selection.setWithHtml(this.nativeEditor, 'Here we should have {selection}.');

                var rect = this.nativeEditor.getClientRectsRegion();

                assert.isObject(rect);
                assert.property(rect, 'bottom');
                assert.property(rect, 'left');
                assert.property(rect, 'right');
                assert.property(rect, 'top');


                bender.tools.selection.setWithHtml(this.nativeEditor, 'Here we should have an empty selection.');

                rect = this.nativeEditor.getClientRectsRegion();

                assert.isObject(rect);
                assert.property(rect, 'bottom');
                assert.property(rect, 'left');
                assert.property(rect, 'right');
                assert.property(rect, 'top');
            });

            it('should retrieve selection direction', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, 'Here we should have {selection}.');

                var direction = this.nativeEditor.getSelectionDirection();

                assert.strictEqual(CKEDITOR.SELECTION_TOP_TO_BOTTOM, direction);
            });
        });

        describe('without focusing the editor after instance create', function() {
            this.timeout(35000);

            before(function(done) {
                var editable = document.createElement('div');

                editable.setAttribute('id', 'editable');
                editable.setAttribute('contenteditable', true);

                document.getElementsByTagName('body')[0].appendChild(editable);

                this._editable = editable;

                this.nativeEditor = CKEDITOR.inline('editable', {
                    extraPlugins: 'ae_selectionregion'
                });

                this.nativeEditor.on('instanceReady', function() {
                    done();
                });
            });

            after(function() {
                if (this.nativeEditor) {
                    this.nativeEditor.destroy();
                }

                this._editable.parentNode.removeChild(this._editable);
            })

            it('should not throw exception on retrieving the caret region', function() {
                assert.doesNotThrow(function() {
                    this.nativeEditor.getCaretRegion();
                }.bind(this));
            });
        });
    });
}());
