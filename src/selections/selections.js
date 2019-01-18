import SelectionGetArrowBoxClasses from './selection-arrowbox.js';
import SelectionSetPosition from './selection-position.js';
import SelectionTest from './selection-test.js';

const Selections = [{
    name: 'embed',
    buttons: ['embedRemove','embedEdit'],
    test: SelectionTest.embed
}, {
    name: 'embedUrl',
    buttons: ['embedVideo', 'embedVideoEdit'],
    test: SelectionTest.embedUrl
}, {
    name: 'link',
    buttons: ['linkEdit'],
    test: SelectionTest.link
}, {
    name: 'image',
    buttons: ['imageLeft', 'imageCenter', 'imageRight', 'AccessibilityImageAlt'],
    setPosition: SelectionSetPosition.image,
    test: SelectionTest.image
}, {
    name: 'text',
    buttons: {
        full: [
            [
                'Font', 'FontSize', 'separator', 'bold', 'italic',
                'underline', 'strike', 'separator', 'link'
            ],
            [
                'paragraphAlign', 'separator', 'ul', 'ol', 'separator', 'h1', 'h2',
                'separator', 'indentBlock', 'outdentBlock', 'separator',
                'TextColor', 'BGColor', 'separator', 'code', 'quote', 'separator', 'removeFormat'
            ]
        ],

        simple: ['styles', 'bold', 'italic', 'underline', 'link']

        // simple: [
        //     'backgroundColor',
        //     'camera',
        //     'color',
        //     'embed',
        //     'h1',
        //     'h2',
        //     'hline',
        //     'image',
        //     'imageCenter',
        //     'imageLeft',
        //     'imageRight',
        //     'indentBlock',
        //     'italic',
        //     'link',
        //     'linkBrowse',
        //     'linkTargetEdit',
        //     'ol',
        //     'outdentBlock',
        //     'paragraphAlign',
        //     'paragraphCenter',
        //     'paragraphJustify',
        //     'paragraphLeft',
        //     'paragraphRight',
        //     'quote',
        //     'removeFormat',
        //     'spacing',
        //     'spacing',
        //     'strike',
        //     'styles',
        //     'subscript',
        //     'superscript',
        //     'tableCell',
        //     'tableColumn',
        //     'tableEdit',
        //     'tableHeading',
        //     'tableRemove',
        //     'tableRow',
        //     'table',
        //     'twitter',
        //     'ul',
        //     'underline'
        // ]
    },
    test: SelectionTest.text
}, {
    name: 'table',
    buttons: ['tableHeading', 'tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
    getArrowBoxClasses: SelectionGetArrowBoxClasses.table,
    setPosition: SelectionSetPosition.table,
    test: SelectionTest.table
}];

export default Selections;