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
        buttons: {
            full: [
                [
                    'styles', 'separator', 'bold', 'italic', 'underline', 'strike', 'separator',
                    'link', 'separator', 'Font', 'FontSize'
                ],
                [
                    'TextColor', 'BGColor', 'separator', 'paragraphAlign', 'separator',
                    'ul', 'ol', 'separator',  'h1', 'h2', 'separator', 'indentBlock', 'outdentBlock',
                    'separator', 'code', 'quote', 'separator', 'removeFormat'
                ]
            ],
            simple: ['styles', 'bold', 'italic', 'underline', 'link']
        },
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
