(function() {
    'use strict';

    if (CKEDITOR.plugins.get('table')) {
        return;
    }

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
            // Override the default cursor position after insertElement to place
            // cursor inside the first cell (#7959), IE needs a while.
            setTimeout(function() {
                var firstCell = new CKEDITOR.dom.element(table.$.rows[0].cells[0]);
                var range = editor.createRange();
                range.moveToPosition(firstCell, CKEDITOR.POSITION_AFTER_START);
                range.select();
            }, 0);

            return table;
        },

        insertRow: function(config) {},

        removeRow: function(config) {},

        insertCell: function(config) {},

        removeCell: function(config) {},

        remove: function() {},

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

    /**
     * CKEditor plugin which allows creating tables.
     *
     * @class CKEDITOR.plugins.tables
     */
    CKEDITOR.plugins.add(
        'table', {
            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             *
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                this._table = new CKEDITOR.Table(editor);
            }

            /**
             * Fired when an image is being added to the editor successfully.
             *
             * @event imagedrop
             * @param {CKEDITOR.dom.element} el The created image with src, created as Data URI
             */
        }
    );
}());
