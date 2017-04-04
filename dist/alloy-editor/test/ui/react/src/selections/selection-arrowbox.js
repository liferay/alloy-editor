'use strict';

(function () {
    'use strict';

    var tableSelectionGetArrowBoxClasses = function tableSelectionGetArrowBoxClasses() {
        return 'ae-arrow-box ae-arrow-box-bottom';
    };

    AlloyEditor.SelectionGetArrowBoxClasses = {
        table: tableSelectionGetArrowBoxClasses
    };
})();