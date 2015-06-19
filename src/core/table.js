(function() {
    'use strict';

    /**
     * Table class utility. Provides methods for create, delete and update tables.
     *
     * @class CKEDITOR.Table
     * @constructor
     * @param {Object} editor The CKEditor instance.
     */

    function Table(editor) {
        this._editor = editor;
    }

    Table.prototype = {
        constructor: Table,

        /**
         * Creates a table.
         *
         * @method create
         * @param {Object} config Table configuration object
         * @return {Object} The created table
         */
        create: function(config) {
            var editor = this._editor;
            var table = this._createElement('table');

            config = config || {};

            // Generate the rows and cols.
            var tbody = table.append(this._createElement('tbody'));
            var rows = config.rows || 1;
            var cols = config.cols || 1;

            for (var i = 0; i < rows; i++) {
                var row = tbody.append(this._createElement('tr'));
                for (var j = 0; j < cols; j++) {
                    var cell = row.append(this._createElement('td'));

                    cell.appendBogus();
                }
            }

            if (!table.getAttribute('style')) {
                table.removeAttribute('style');
            }

            this.setAttributes(table, config.attrs || {});

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
         * Removes a table from the editor.
         *
         * @method remove
         * @param {CKEDITOR.dom.element} table The table element which table style should be removed.
         */
        remove: function(table) {
            var editor = this._editor;

            if (table) {
                table.remove();
            } else {
                table = editor.elementPath().contains('table', 1);

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

        /**
         * Assigns provided attributes to a table.
         *
         * @method setAttributes
         * @param {Object} table The table to which the attributes should be assigned
         * @param {Object} attrs The attributes which have to be assigned to the table
         */
        setAttributes: function(table, attrs) {
            Object.keys(attrs).forEach(function(attr) {
                table.setAttribute(attr, attrs[attr]);
            });
        },

        /**
         * Creates a new CKEDITOR.dom.element using the passed tag name.
         *
         * @protected
         * @method _createElement
         * @param {String} name The tag name from which an element should be created
         * @return {CKEDITOR.dom.element} Instance of CKEDITOR DOM element class
         */
        _createElement: function(name) {
            return new CKEDITOR.dom.element(name, this._editor.document);
        }
    };

    CKEDITOR.Table = CKEDITOR.Table || Table;
}());
