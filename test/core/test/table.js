(function() {
    'use strict';

    var assert = chai.assert;

    var getFixtures = Utils.getFixtures('test/core/test/fixtures', 'table.html');

    describe('Table', function() {
        this.timeout(35000);

        before(Utils.createCKEditor);

        after(Utils.destroyCKEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should create a 1x1 table when no parameters are specified', function() {
            assertResultAfterRunningCommand.call(this, 'create_no_params', function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.create();
            });
        });

        it('should create a 1x1 table when an empty configuration is specified', function() {
            assertResultAfterRunningCommand.call(this, 'create_no_params', function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.create({});
            });
        });

        it('should create a 3x1 table when only the rows param is specified', function() {
            assertResultAfterRunningCommand.call(this, 'create_3_1', function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.create({
                    rows: 3
                });
            });
        });

        it('should create a 1x3 table when only the cols param is specified', function() {
            assertResultAfterRunningCommand.call(this, 'create_1_3', function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.create({
                    cols: 3
                });
            });
        });

        it('should add all attributes to the created table', function() {
            assertResultAfterRunningCommand.call(this, 'create_with_attrs', function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.create({
                    attrs: {
                        bgcolor: '#ff0',
                        border: 0,
                        style: 'width: 100%;'
                    }
                });
            });
        });

        it('should remove the table when the cursor is inside and no parameters are specified', function() {
            assertResultAfterRunningCommand.call(this, 'remove_table_when_cursor_inside', function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.remove();
            });
        });

        it('should keep the table when the cursor is outside and no parameters are specified', function() {
            assertResultAfterRunningCommand.call(this, 'remove_table_when_cursor_outside', function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.remove();
            });
        });

        it('should remove the table parent when the cursor is inside and no parameters are specified and the table is the only child', function() {
            assertResultAfterRunningCommand.call(this, 'remove_table_parent_when_only_child', function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.remove();
            });
        });

        it('should remove a given table element', function() {
            assertResultAfterRunningCommand.call(this, 'remove_table_element', function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                var table = this.nativeEditor.element.getElementsByTag('table').getItem(0);

                tableUtils.remove(table);
            });
        });

        it('should return a table when the cursor is inside', function() {
            var fixtures = getFixtures("get_table_from_selection_cursor_inside");

            bender.tools.selection.setWithHtml(this.nativeEditor, fixtures.initial);

            var tableElement = this.nativeEditor.element.find('table').getItem(0);

            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            var table = tableUtils.getFromSelection();

            assert.isNotNull(table);
            assert.strictEqual(table.$, tableElement.$);
        });

        it('should return the selected table', function() {
            var fixtures = getFixtures("get_table_from_selection");

            bender.tools.selection.setWithHtml(this.nativeEditor, fixtures.initial);

            var tableElement = this.nativeEditor.element.find('table').getItem(1);

            this.nativeEditor.getSelection().selectElement(tableElement);

            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            var table = tableUtils.getFromSelection();

            assert.isNotNull(table);
            assert.strictEqual(table.$, tableElement.$);
        });

        var assertResultAfterRunningCommand = function(fixtureName, command) {
            var fixtures = getFixtures(fixtureName);

            bender.tools.selection.setWithHtml(this.nativeEditor, fixtures.initial);

            command.call(this);

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, fixtures.expected);
        };
    });
}());