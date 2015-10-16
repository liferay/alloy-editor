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

        it('should create a 3x3 table with the first row as heading', function() {
            var initialFixture = 'empty.html';
            var expectedFixture = '3_by_3_table_row_heading.html';
            var command = function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.create({
                    cols: 3,
                    heading: CKEDITOR.Table.HEADING_ROW,
                    rows: 3
                });
            };

            assertResult.call(this,
                initialFixture, command, expectedFixture
            );
        });

        it('should create a 3x3 table with the first col as heading', function() {
            var initialFixture = 'empty.html';
            var expectedFixture = '3_by_3_table_col_heading.html';
            var command = function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.create({
                    cols: 3,
                    heading: CKEDITOR.Table.HEADING_COL,
                    rows: 3
                });
            };

            assertResult.call(this,
                initialFixture, command, expectedFixture
            );
        });

        it('should create a 3x3 table with the first row and col as heading', function() {
            var initialFixture = 'empty.html';
            var expectedFixture = '3_by_3_table_both_heading.html';
            var command = function() {
                var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                tableUtils.create({
                    cols: 3,
                    heading: CKEDITOR.Table.HEADING_BOTH,
                    rows: 3
                });
            };

            assertResult.call(this,
                initialFixture, command, expectedFixture
            );
        });

        it('should say the table has row heading if the table has a thead element', function() {
            var initialFixture = getFixture('3_by_3_table_row_heading.html');

            bender.tools.selection.setWithHtml(this.nativeEditor, initialFixture);

            var tableElement = this.nativeEditor.element.find('table').getItem(0);

            this.nativeEditor.getSelection().selectElement(tableElement);

            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            assert.strictEqual(tableUtils.getHeading(), CKEDITOR.Table.HEADING_ROW);
        });

        it('should say the table has column heading if every first cell in a table row is a <th> element', function() {
            var initialFixture = getFixture('3_by_3_table_col_heading.html');

            bender.tools.selection.setWithHtml(this.nativeEditor, initialFixture);

            var tableElement = this.nativeEditor.element.find('table').getItem(0);

            this.nativeEditor.getSelection().selectElement(tableElement);

            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            assert.strictEqual(tableUtils.getHeading(), CKEDITOR.Table.HEADING_COL);
        });

        it('should say the table has both heading if it has both row and column heading', function() {
            var initialFixture = getFixture('3_by_3_table_both_heading.html');

            bender.tools.selection.setWithHtml(this.nativeEditor, initialFixture);

            var tableElement = this.nativeEditor.element.find('table').getItem(0);

            this.nativeEditor.getSelection().selectElement(tableElement);

            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            assert.strictEqual(tableUtils.getHeading(), CKEDITOR.Table.HEADING_BOTH);
        });

        it('should return null for table heading if table has not been specified and is not in the current selection', function() {
            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            assert.isNull(tableUtils.getHeading());
        });

        it('should switch from any given heading setting to any possible setting properly', function() {
            var HEADING_NONE = CKEDITOR.Table.HEADING_NONE,
                HEADING_COL = CKEDITOR.Table.HEADING_COL,
                HEADING_ROW = CKEDITOR.Table.HEADING_ROW,
                HEADING_BOTH = CKEDITOR.Table.HEADING_BOTH;

            var headingFixtures = {};

            headingFixtures[HEADING_NONE] = '3_by_3_table_no_heading.html';
            headingFixtures[HEADING_ROW] = '3_by_3_table_row_heading.html';
            headingFixtures[HEADING_COL] = '3_by_3_table_col_heading.html';
            headingFixtures[HEADING_BOTH] = '3_by_3_table_both_heading.html';

            var testMatrix = [
                {initial: HEADING_NONE, expected: HEADING_ROW},
                {initial: HEADING_NONE, expected: HEADING_COL},
                {initial: HEADING_NONE, expected: HEADING_BOTH},
                {initial: HEADING_ROW, expected: HEADING_NONE},
                {initial: HEADING_ROW, expected: HEADING_COL},
                {initial: HEADING_ROW, expected: HEADING_BOTH},
                {initial: HEADING_COL, expected: HEADING_NONE},
                {initial: HEADING_COL, expected: HEADING_ROW},
                {initial: HEADING_COL, expected: HEADING_BOTH},
                {initial: HEADING_BOTH, expected: HEADING_NONE},
                {initial: HEADING_BOTH, expected: HEADING_ROW},
                {initial: HEADING_BOTH, expected: HEADING_COL}
            ];

            testMatrix.forEach(function(testData) {
                var errorMessage = 'Changing table heading from ' + testData.initial + ' to ' + testData.expected + ' did not produce the expected result';
                var initialFixture = headingFixtures[testData.initial];
                var expectedFixture = headingFixtures[testData.expected];
                var command = function() {
                    var tableElement = this.nativeEditor.element.find('table').getItem(0);

                    this.nativeEditor.getSelection().selectElement(tableElement);

                    var tableUtils = new CKEDITOR.Table(this.nativeEditor);

                    tableUtils.setHeading(null, testData.expected);
                };

                assertResult.call(this,
                    initialFixture, command, expectedFixture, errorMessage
                );
            }.bind(this));
        });

        it('should attach commands to the editor for every possible heading setting', function() {
            var afterCommandExec = sinon.stub();

            var initialFixture = getFixture('3_by_3_table_no_heading.html');

            bender.tools.selection.setWithHtml(this.nativeEditor, initialFixture);

            var tableElement = this.nativeEditor.element.find('table').getItem(0);

            this.nativeEditor.getSelection().selectElement(tableElement);

            this.nativeEditor.on('afterCommandExec', afterCommandExec);

            this.nativeEditor.execCommand('tableHeadingRow');
            this.nativeEditor.execCommand('tableHeadingColumn');
            this.nativeEditor.execCommand('tableHeadingBoth');
            this.nativeEditor.execCommand('tableHeadingNone');

            assert.strictEqual(afterCommandExec.callCount, 4);
        });

        it('should say the table has no heading if it does not have neither row nor column heading', function() {
            var initialFixture = getFixture('3_by_3_table_no_heading.html');

            bender.tools.selection.setWithHtml(this.nativeEditor, initialFixture);

            var tableElement = this.nativeEditor.element.find('table').getItem(0);

            this.nativeEditor.getSelection().selectElement(tableElement);

            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            assert.strictEqual(tableUtils.getHeading(), CKEDITOR.Table.HEADING_NONE);
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


        it('should consider the table as editable', function() {
            var initialFixture = getFixture('editable_by_parent_table.html');

            bender.tools.selection.setWithHtml(this.nativeEditor, initialFixture);

            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            assert.isTrue(tableUtils.isEditable(this.nativeEditor.element.findOne('table')));
        });

        it('should take parent contenteditable into account', function() {
            var initialFixture = getFixture('not_editable_by_parent_table.html');

            bender.tools.selection.setWithHtml(this.nativeEditor, initialFixture);

            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            assert.isFalse(tableUtils.isEditable(this.nativeEditor.element.findOne('table')));
        });

        it('should take table contenteditable attribute into account', function () {
            var initialFixture = getFixture('not_editable_attribute_table.html');

            bender.tools.selection.setWithHtml(this.nativeEditor, initialFixture);

            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            assert.isFalse(tableUtils.isEditable(this.nativeEditor.element.findOne('#not-editable')));
            assert.isTrue(tableUtils.isEditable(this.nativeEditor.element.findOne('#editable')));
        });

        it('should handle nested table', function() {
            var initialFixture = getFixture('editable_by_parent_nested_tables.html');

            bender.tools.selection.setWithHtml(this.nativeEditor, initialFixture);

            var tableUtils = new CKEDITOR.Table(this.nativeEditor);

            assert.isTrue(tableUtils.isEditable(this.nativeEditor.element.findOne('#deep')));
        });
    });
}());