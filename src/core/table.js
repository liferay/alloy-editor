(function() {
    'use strict';

    /**
     * Table class utility. Provides methods for create, delete and update tables.
     *
     * @class CKEDITOR.Table
     * @constructor
     * @param {Object} The CKEditor instance.
     */

    function Table(editor) {
        this._editor = editor;
    }

    Table.prototype = {
        constructor: Table,

        /**
         * Creates a table.
         *
         * @param {Object} config Table configuration object
         * @return {Object} The created table
         */
        create: function(config) {
            var editor = this._editor;
            var table = this._makeElement('table');

            // Generate the rows and cols.
            var tbody = table.append(this._makeElement('tbody'));
            var rows = config.rows || 1;
            var cols = config.cols || 1;

            for (var i = 0; i < rows; i++) {
                var row = tbody.append(this._makeElement('tr'));
                for (var j = 0; j < cols; j++) {
                    var cell = row.append(this._makeElement('td'));

                    cell.appendBogus();
                }
            }

            if (!table.getAttribute('style')) {
                table.removeAttribute('style');
            }

            this.setAttributes(table, config.attrs);

            // Insert the table element if we're creating one.
            editor.insertElement(table);

            var firstCell = new CKEDITOR.dom.element(table.$.rows[0].cells[0]);
            var range = editor.createRange();
            range.moveToPosition(firstCell, CKEDITOR.POSITION_AFTER_START);
            range.select();

            return table;
        },

        /**
         * Retrieves a table from the current selection.
         *
         * @method getFromSelection
         * @return {CKEDITOR.dom.element} The retrieved table or null if not found.
         */
        getFromSelection: function() {
            var table;
            var selection = this._editor.getSelection();
            var selected = selection.getSelectedElement();

            if (selected && selected.is('table')) {
                table = selected;
            } else {
                var ranges = selection.getRanges();

                if (ranges.length > 0) {
                    // Webkit could report the following range on cell selection (#4948):
                    // <table><tr><td>[&nbsp;</td></tr></table>]
                    if (CKEDITOR.env.webkit) {
                        ranges[0].shrink(CKEDITOR.NODE_ELEMENT);
                    }

                    table = this._editor.elementPath(ranges[0].getCommonAncestor(true)).contains('table', 1);
                }
            }

            return table;
        },

        /**
         * Removes a link from the editor.
         *
         * @param {CKEDITOR.dom.element} link The link element which link style should be removed.
         * @method remove
         */
        remove: function(table) {
            var editor = this._editor;

            if (table) {
                table.remove(editor);
            } else {
                table = editor.elementPath().contains( 'table', 1 );

                if (table) {
                    // If the table's parent has only one child remove it as well (unless it's a table cell, or the editable element) (#5416, #6289, #12110)
                    var parent = table.getParent(),
                        editable = editor.editable();

                    if (parent.getChildCount() == 1 && !parent.is('td', 'th') && !parent.equals(editable)) {
                        table = parent;
                    }

                    var range = editor.createRange();
                    range.moveToPosition(table, CKEDITOR.POSITION_BEFORE_START);
                    table.remove();
                    range.select();
                }
            }
        },

        setAttributes: function(table, attrs) {
            Object.keys(attrs).forEach(function(attr) {
                table.setAttribute(attr, attrs[attr]);
            });
        },

        _makeElement: function(name) {
            return new CKEDITOR.dom.element(name, this._editor.document);
        }
    };

    CKEDITOR.Table = CKEDITOR.Table || Table;
}());
