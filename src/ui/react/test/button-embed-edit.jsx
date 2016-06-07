(function() {
    'use strict';

    var assert = chai.assert;

    var TestUtils = React.addons.TestUtils;

    var Simulate = TestUtils.Simulate;

    var KEY_ENTER = 13;

    var KEY_ESC = 27;

    var getFixture = Utils.getFixture('src/ui/react/test/fixtures');

    describe('ButtonEmbedEdit', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(function(done) {
            if (CKEDITOR.tools.jsonp.restore) {
                CKEDITOR.tools.jsonp.restore();
            }

            Utils.afterEach.call(this, done);
        });

        it('should focus on the link input as soon as the component gets rendered', function() {
            // Make requestAnimationFrame synchronous to avoid unnecessary test delays
            var stub = sinon.stub(window, 'requestAnimationFrame', function(callback) {
                callback();
            });

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor} renderExclusive={true}/>, this.container);

            stub.restore();

            assert.strictEqual(document.activeElement, buttonEmbedEdit.refs.linkInput);
        });

        it('should focus on the link input as soon as the component gets rendered in older browsers', function() {
            // Make setTimeout synchronous to avoid unnecessary test delays
            var requestAnimationFrame = window.requestAnimationFrame;
            var stub = sinon.stub(window, 'setTimeout', function(callback) {
                callback();
            });

            window.requestAnimationFrame = null;

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor} renderExclusive={true}/>, this.container);

            window.requestAnimationFrame = requestAnimationFrame;
            stub.restore();

            assert.strictEqual(document.activeElement, buttonEmbedEdit.refs.linkInput);
        });

        it('should have input value equal to embed selection url', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, getFixture('embed.html'));

            this.nativeEditor.getSelection().selectElement(this.nativeEditor.element.findOne('#embedfoo'));

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor} />, this.container);

            assert.strictEqual(buttonEmbedEdit.refs.linkInput.value, 'https://foo.com');
        });

        it('should embed area is removed when embed remove button is clicked', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, getFixture('embed.html'));

            this.nativeEditor.getSelection().selectElement(this.nativeEditor.element.findOne('#embedfoo'));

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor} />, this.container);

            var buttonRemove = TestUtils.findRenderedDOMComponentWithClass(buttonEmbedEdit, 'ae-icon-bin');

            Simulate.click(buttonRemove.parentNode);

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '');
        });

        it('should input will change when selection is changed between embed contents', function () {
            var buttonEmbedEdit;

            bender.tools.selection.setWithHtml(this.nativeEditor, getFixture('embed_multiple.html'));

            this.nativeEditor.getSelection().selectElement(this.nativeEditor.element.findOne('#embedfoo'));

            buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor} />, this.container);

            assert.strictEqual(buttonEmbedEdit.refs.linkInput.value, 'https://foo.com');

            this.nativeEditor.getSelection().selectElement(this.nativeEditor.element.findOne('#embedbar'));

            buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor} />, this.container);

            assert.strictEqual(buttonEmbedEdit.refs.linkInput.value, 'https://bar.com');
        });

        it('should be disable ok button when url is empty', function() {
            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor} />, this.container);

            var buttonOk = TestUtils.findRenderedDOMComponentWithClass(buttonEmbedEdit, 'ae-icon-ok');

            assert.isTrue(buttonOk.parentNode.hasAttribute('disabled'));
        });

        it('should clear input when remove button into input is clicked', function() {
            var cancelExclusive = sinon.stub();

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit cancelExclusive={cancelExclusive} editor={this.editor} renderExclusive={true} />, this.container);

            var clearButton = TestUtils.findRenderedDOMComponentWithClass(buttonEmbedEdit, 'ae-icon-remove');

            var linkInput = buttonEmbedEdit.refs.linkInput;

            TestUtils.Simulate.change(linkInput, {
                target: {
                    value: 'https://foo.com'
                }
            });

            Simulate.click(clearButton);

            assert.strictEqual(linkInput.value, '');
        });

        it('should change embed content when url is changed', function() {
            sinon.stub(CKEDITOR.tools, 'jsonp', function(fn, data, success, fail) {
                success({
                    html: getFixture('embed_content.html')
                });
            });

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit cancelExclusive={sinon.stub()} editor={this.editor} renderExclusive={true} />, this.container);

            TestUtils.Simulate.change(buttonEmbedEdit.refs.linkInput, {
                target: {
                    value: 'https://foo.com'
                }
            });

            var buttonOk = TestUtils.findRenderedDOMComponentWithClass(buttonEmbedEdit, 'ae-icon-ok').parentNode;

            Simulate.click(buttonOk);

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, getFixture('embed_content_expected.html'));
        });

        it('should change embed content when KEY_ENTER is pushed in embed input', function() {
            sinon.stub(CKEDITOR.tools, 'jsonp', function(fn, data, success, fail) {
                success({
                    html: getFixture('embed_content.html')
                });
            });

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit cancelExclusive={sinon.stub()} editor={this.editor} renderExclusive={true} />, this.container);

            Simulate.change(buttonEmbedEdit.refs.linkInput, {
                target: {
                    value: 'https://foo.com'
                }
            });

            Simulate.keyDown(buttonEmbedEdit.refs.linkInput, {key: "Enter", keyCode: KEY_ENTER, which: KEY_ENTER});

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, getFixture('embed_content_expected.html'));
        });

        it('should close toolbar when KEY_ESC is pushed in embed input', function() {
            var spy = sinon.spy();

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit cancelExclusive={spy} editor={this.editor} renderExclusive={true} />, this.container);

            Simulate.keyDown(buttonEmbedEdit.refs.linkInput, {key: "Escape", keyCode: KEY_ESC, which: KEY_ESC});

            assert.isTrue(spy.calledOnce);
        });
    });
}());
