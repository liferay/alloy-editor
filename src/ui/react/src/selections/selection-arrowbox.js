(function() {
    'use strict';

    var tableSelectionGetArrowBoxClasses = function() {
        return 'alloy-editor-arrow-box alloy-editor-arrow-box-bottom';
    };

    AlloyEditor.SelectionGetArrowBoxClasses = {
        table: tableSelectionGetArrowBoxClasses
    };
}());
