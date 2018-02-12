import SelectionGetArrowBoxClasses from './selection-arrowbox.js';
import SelectionSetPosition from './selection-position.js';
import SelectionTest from './selection-test.js';

const Selections = [{
    name: 'embed',
    buttons: ['embedRemove', 'embedEdit'],
    test: SelectionTest.embed
}, {
    name: 'link',
    buttons: ['linkEdit'],
    test: SelectionTest.link
}, {
    name: 'image',
    buttons: ['imageLeft', 'imageCenter', 'imageRight'],
    setPosition: SelectionSetPosition.image,
    test: SelectionTest.image
}, {
    name: 'text',
    buttons: ['styles', 'bold', 'italic', 'underline', 'link', 'twitter'],
    test: SelectionTest.text
}, {
    name: 'table',
    buttons: ['tableHeading', 'tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
    getArrowBoxClasses: SelectionGetArrowBoxClasses.table,
    setPosition: SelectionSetPosition.table,
    test: SelectionTest.table
}];

export default Selections;