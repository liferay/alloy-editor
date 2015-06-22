(function() {
    'use strict';

    var assert = chai.assert;

    var assertResult = Utils.assertResult('test/core/test/fixtures');
    var getFixture = Utils.getFixture('test/core/test/fixtures');

    describe('Table', function() {
        this.timeout(35000);

        before(Utils.createCKEditor);

        after(Utils.destroyCKEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should create a 1x1 table when no parameters are specified', function() {
            var initialFixture = 'empty.html';
            var expectedFixture = '1_by_1_table.html';
            var command = function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.create();
            };

            assertResult.call(this,
                initialFixture, command, expectedFixture
            );
        });

        it('should create a 1x1 table when an empty configuration is specified', function() {
            var initialFixture = 'empty.html';
            var expectedFixture = '1_by_1_table.html';
            var command = function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.create({});
            };

            assertResult.call(this,
                initialFixture, command, expectedFixture
            );
        });

        it('should create a 3x1 table when only the rows param is specified', function() {
            var initialFixture = 'empty.html';
            var expectedFixture = '3_by_1_table.html';
            var command = function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.create({
                    rows: 3
                });
            };

            assertResult.call(this,
                initialFixture, command, expectedFixture
            );
        });

        it('should create a 1x3 table when only the cols param is specified', function() {
            var initialFixture = 'empty.html';
            var expectedFixture = '1_by_3_table.html';
            var command = function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.create({
                    cols: 3
                });
            };

            assertResult.call(this,
                initialFixture, command, expectedFixture
            );
        });

        it('should add all attributes to the created table', function() {
            var initialFixture = 'empty.html';
            var expectedFixture = '1_by_1_table_with_attrs.html';
            var command = function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.create({
                    attrs: {
                        bgcolor: '#ff0',
                        border: 0,
                        style: 'width: 100%;'
                    }
                });
            };

            assertResult.call(this,
                initialFixture, command, expectedFixture
            );
        });

        it('should remove the table when the selection is inside and no parameters are specified', function() {
            var initialFixture = '1_by_1_table.html';
            var expectedFixture = 'empty.html';
            var command = function() {
                var cellElement = this.nativeEditor.element.find('td').getItem(0);

                this.nativeEditor.getSelection().selectElement(cellElement);

                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.remove();
            };

            assertResult.call(this,
                initialFixture, command, expectedFixture
            );
        });

        it('should remove the table parent when the selection is inside and no parameters are specified and the table is the only child', function() {
            var initialFixture = '1_by_1_wrapped_table.html';
            var expectedFixture = 'empty.html';
            var command = function() {
                var cellElement = this.nativeEditor.element.find('td').getItem(0);

                this.nativeEditor.getSelection().selectElement(cellElement);

                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.remove();
            };

            assertResult.call(this,
                initialFixture, command, expectedFixture
            );
        });

        it('should keep the table when the selection is outside and no parameters are specified', function() {
            var initialFixture = '1_by_1_table.html';
            var expectedFixture = '1_by_1_table.html';
            var command = function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.remove();
            };

            assertResult.call(this,
                initialFixture, command, expectedFixture
            );
        });

        it('should remove a given table element', function() {
            var initialFixture = '1_by_1_table.html';
            var expectedFixture = 'empty.html';
            var command = function() {
                var table = this.nativeEditor.element.getElementsByTag('table').getItem(0);

                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.remove(table);
            };

            assertResult.call(this,
                initialFixture, command, expectedFixture
            );
        });

        it('should return a table when the selection is inside', function() {
            var initialFixture = getFixture('3_tables_selection_inside_second.html');

            bender.tools.selection.setWithHtml(this.nativeEditor, initialFixture);

            var tableElement = this.nativeEditor.element.find('table').getItem(1);

            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            var table = tableUtils.getFromSelection();

            assert.isNotNull(table);
            assert.strictEqual(table.$, tableElement.$);
        });

        it('should return the selected table', function() {
            var initialFixture = getFixture('3_tables_selection_inside_second.html');

            bender.tools.selection.setWithHtml(this.nativeEditor, initialFixture);

            var tableElement = this.nativeEditor.element.find('table').getItem(1);

            this.nativeEditor.getSelection().selectElement(tableElement);

            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            var table = tableUtils.getFromSelection();

            assert.isNotNull(table);
            assert.strictEqual(table.$, tableElement.$);
        });

        it('should not return table when there is no selection', function() {
            var initialFixture = getFixture('1_by_1_table.html');

            bender.tools.selection.setWithHtml(this.nativeEditor, initialFixture);

            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            this.nativeEditor.getSelection().removeAllRanges();

            var table = tableUtils.getFromSelection();

            assert.isUndefined(table);
        });
    });
}());