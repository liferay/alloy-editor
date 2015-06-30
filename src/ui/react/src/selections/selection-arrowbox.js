(function() {
    'use strict';

    var tableSelectionGetArrowBoxClasses = function() {
        return 'ae-arrow-box ae-arrow-box-bottom';
    };

    AlloyEditor.SelectionGetArrowBoxClasses = {
        table: tableSelectionGetArrowBoxClasses
    };
}());
