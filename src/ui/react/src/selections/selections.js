(function() {
    'use strict';

    var Selections = [{
        name: 'embed',
        buttons: ['embedRemove','embedEdit'],
        test: AlloyEditor.SelectionTest.embed
    }, {
        name: 'link',
        buttons: ['linkEdit'],
        test: AlloyEditor.SelectionTest.link
    }, {
        name: 'image',
        buttons: ['imageLeft', 'imageCenter', 'imageRight'],
        setPosition: AlloyEditor.SelectionSetPosition.image,
        test: AlloyEditor.SelectionTest.image
    }, {
        name: 'text',
        buttons: ['styles', 'bold', 'italic', 'underline', 'link', 'twitter'],
        test: AlloyEditor.SelectionTest.text
    }, {
        name: 'table',
        buttons: ['tableHeading', 'tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
        getArrowBoxClasses: AlloyEditor.SelectionGetArrowBoxClasses.table,
        setPosition: AlloyEditor.SelectionSetPosition.table,
        test: AlloyEditor.SelectionTest.table
    }];

    AlloyEditor.Selections = Selections;
}());
