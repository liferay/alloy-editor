(function() {
    'use strict';

    var assert = chai.assert;
    var TestUtils = React.addons.TestUtils;
    var Simulate = TestUtils.Simulate;

    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    var getFixture = Utils.getFixture('src/ui/react/test/fixtures');

    describe('ButtonTableEdit', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should create a 3x3 table by default when clicking on the confirm button', function() {
            var buttonTableEdit = ReactDOM.render(<AlloyEditor.ButtonTableEdit cancelExclusive={sinon.stub()} editor={this.editor} />, this.container);

            var confirmButton = TestUtils.findRenderedDOMComponentWithTag(buttonTableEdit, 'button');

            Simulate.click(ReactDOM.findDOMNode(confirmButton));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            var expected = getFixture('3_by_3_empty_table.html');

            assert.strictEqual(data, expected);
        });

        it('should create a 6 x 4 table based on the rows and cols inputs when clicking on the confirm button', function() {
            var buttonTableEdit = ReactDOM.render(<AlloyEditor.ButtonTableEdit cancelExclusive={sinon.stub()} editor={this.editor} />, this.container);

            Simulate.change(ReactDOM.findDOMNode(buttonTableEdit.refs.rows), {target: {value: 6}});
            Simulate.change(ReactDOM.findDOMNode(buttonTableEdit.refs.cols), {target: {value: 4}});

            var confirmButton = TestUtils.findRenderedDOMComponentWithTag(buttonTableEdit, 'button');

            Simulate.click(ReactDOM.findDOMNode(confirmButton));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            var expected = getFixture('6_by_4_table.html');

            assert.strictEqual(data, expected);
        });

        it('should create a 6 x 4 table based on the rows and cols inputs when pressing enter on the rows input', function() {
            var buttonTableEdit = ReactDOM.render(<AlloyEditor.ButtonTableEdit cancelExclusive={sinon.stub()} editor={this.editor} />, this.container);

            Simulate.change(ReactDOM.findDOMNode(buttonTableEdit.refs.rows), {target: {value: 6}});
            Simulate.change(ReactDOM.findDOMNode(buttonTableEdit.refs.cols), {target: {value: 4}});

            Simulate.keyDown(ReactDOM.findDOMNode(buttonTableEdit.refs.rows), {keyCode: KEY_ENTER});

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            var expected = getFixture('6_by_4_table.html');

            assert.strictEqual(data, expected);
        });

        it('should create a 6 x 4 table based on the rows and cols inputs when pressing enter on the cols input', function() {
            var buttonTableEdit = ReactDOM.render(<AlloyEditor.ButtonTableEdit cancelExclusive={sinon.stub()} editor={this.editor} />, this.container);

            Simulate.change(ReactDOM.findDOMNode(buttonTableEdit.refs.rows), {target: {value: 6}});
            Simulate.change(ReactDOM.findDOMNode(buttonTableEdit.refs.cols), {target: {value: 4}});

            Simulate.keyDown(ReactDOM.findDOMNode(buttonTableEdit.refs.cols), {keyCode: KEY_ENTER});

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            var expected = getFixture('6_by_4_table.html');

            assert.strictEqual(data, expected);
        });

        it('should not create a table and dismiss the ui when pressing escape on the rows input', function() {
            var cancelExclusive = sinon.stub();

            var buttonTableEdit = ReactDOM.render(<AlloyEditor.ButtonTableEdit cancelExclusive={cancelExclusive} editor={this.editor} />, this.container);

            bender.tools.selection.setWithHtml(this.nativeEditor, '');

            Simulate.keyDown(ReactDOM.findDOMNode(buttonTableEdit.refs.rows), {keyCode: KEY_ESC});

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '');
            assert.ok(cancelExclusive.called);
            assert.strictEqual(1, cancelExclusive.callCount);
        });

        it('should not create a table and dismiss the ui when pressing escape on the cols input', function() {
            var cancelExclusive = sinon.stub();

            var buttonTableEdit = ReactDOM.render(<AlloyEditor.ButtonTableEdit cancelExclusive={cancelExclusive} editor={this.editor} />, this.container);

            bender.tools.selection.setWithHtml(this.nativeEditor, '');

            Simulate.keyDown(ReactDOM.findDOMNode(buttonTableEdit.refs.cols), {keyCode: KEY_ESC});

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '');
            assert.ok(cancelExclusive.called);
            assert.strictEqual(1, cancelExclusive.callCount);
        });
    });
}());