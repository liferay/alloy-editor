(function() {
    'use strict';

    var assert = chai.assert;

    var TestUtils = React.addons.TestUtils;

    var Simulate = TestUtils.Simulate;

    var url = "https://foo.com";

    var KEY_ENTER = 13;

    var KEY_ESC = 27;

    var auxRequestAnimationFrame = window.requestAnimationFrame;

    describe('ButtonEmbedEdit', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(function(done) {
            Utils.beforeEach.call(this, done);
        });

        afterEach(function(done) {
            if (CKEDITOR.tools.jsonp.restore) {
                CKEDITOR.tools.jsonp.restore();
            }

            Utils.afterEach.call(this, done);
        });


        it('should focusInput is called when window.requestAnimationFrame does not exist', function(done) {
            var spy = sinon.spy(AlloyEditor.ButtonEmbedEdit.prototype.__reactAutoBindMap, '_focusLinkInput');

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor}  renderExclusive={true}/>, this.container);


            setTimeout(function(){
                assert.isTrue(spy.calledOnce);
                AlloyEditor.ButtonEmbedEdit.prototype.__reactAutoBindMap._focusLinkInput.restore();
                done();
            }, 1000);

        });

        it('should focusInput is called when window.requestAnimationFrame exists', function(done) {
            var spy = sinon.spy(AlloyEditor.ButtonEmbedEdit.prototype.__reactAutoBindMap, '_focusLinkInput');

            window.requestAnimationFrame = null;

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor}  renderExclusive={true}/>, this.container);

            setTimeout(function(){
                assert.isTrue(spy.calledOnce);
                AlloyEditor.ButtonEmbedEdit.prototype.__reactAutoBindMap._focusLinkInput.restore();
                window.requestAnimationFrame = auxRequestAnimationFrame;
                done();
            }, 1000);
        });

        it('should have input value equal to embed selection url', function() {
            var embedDiv = '<div id="embed_area" tabindex="-1" contenteditable="false" data-cke-widget-wrapper="1" data-cke-filter="off" class="cke_widget_wrapper cke_widget_new cke_widget_block" data-cke-display-name="div">' +
                '<div id="embed" data-ae-embed-url="' + url + '" ' +
                ' data-cke-widget-upcasted="1" data-widget="ae_embed" ' +
                'class="cke_widget_element">http//alloyeditor.com/demo/</div></div>';

            bender.tools.selection.setWithHtml(this.nativeEditor, embedDiv);

            var elementDiv = this.nativeEditor.element.findOne('#embed_area');

            sinon.stub(this.nativeEditor, 'getSelection', function() {
                return {
                    getSelectedElement: function() {
                        return elementDiv;
                    }
                }
            });

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor} />, this.container);

            var inputEmbed = TestUtils.findRenderedDOMComponentWithTag(buttonEmbedEdit, 'input');

            this.nativeEditor.getSelection.restore();

            assert.strictEqual(url, inputEmbed.value);
        });

        it('should embed area is removed when embed remove button is clicked', function() {
            var embedDiv = '<div id="embed_area" tabindex="-1" contenteditable="false" data-cke-widget-wrapper="1" data-cke-filter="off" class="cke_widget_wrapper cke_widget_new cke_widget_block" data-cke-display-name="div">' +
                '<div id="embed" data-ae-embed-url="#" ' +
                ' data-cke-widget-upcasted="1" data-widget="ae_embed" ' +
                'class="cke_widget_element">http//alloyeditor.com/demo/</div></div>';


            this.nativeEditor.setData(embedDiv);

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor} />, this.container);

            /**
            * Set data with embed div
            * buttonEmbedEdit.setState simulates and forces that element is selected
            */

            var embedElement = this.nativeEditor.element.findOne('#embed');

            buttonEmbedEdit.setState({element: embedElement});

            var buttonRemove = TestUtils.findRenderedDOMComponentWithClass(buttonEmbedEdit, 'ae-icon-bin');

            Simulate.click(buttonRemove.parentNode);

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '');
        });

        it('should input will change when selection is changed between embed contents', function () {
            var embedDiv = '<div id="embed_area1" tabindex="-1" contenteditable="false" data-cke-widget-wrapper="1" data-cke-filter="off" class="cke_widget_wrapper cke_widget_new cke_widget_block" data-cke-display-name="div">' +
                '<div id="embed1" data-ae-embed-url="foo.com" ' +
                ' data-cke-widget-upcasted="1" data-widget="ae_embed" ' +
                'class="cke_widget_element">foo.com</div></div>' +
                '<div id="embed_area2" tabindex="-1" contenteditable="false" data-cke-widget-wrapper="1" data-cke-filter="off" class="cke_widget_wrapper cke_widget_new cke_widget_block" data-cke-display-name="div">' +
                '<div id="embed2" data-ae-embed-url="bar.com" ' +
                ' data-cke-widget-upcasted="1" data-widget="ae_embed" ' +
                'class="cke_widget_element">bar.com</div></div>';

            bender.tools.selection.setWithHtml(this.nativeEditor, embedDiv);

            var embedDiv1 = this.nativeEditor.element.findOne('#embed_area1');

            var embedDiv2 = this.nativeEditor.element.findOne('#embed_area2');

            sinon.stub(this.nativeEditor, 'getSelection', function() {
                return {
                    getSelectedElement: function() {
                        return embedDiv1;
                    }
                }
            });

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor} />, this.container);

            var inputEmbed = TestUtils.findRenderedDOMComponentWithTag(buttonEmbedEdit, 'input');

            this.nativeEditor.getSelection.restore();

            sinon.stub(this.nativeEditor, 'getSelection', function() {
                return {
                    getSelectedElement: function() {
                        return embedDiv2;
                    }
                }
            });

            buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor} />, this.container);

            inputEmbed = TestUtils.findRenderedDOMComponentWithTag(buttonEmbedEdit, 'input');

            this.nativeEditor.getSelection.restore();

            assert.strictEqual('bar.com', inputEmbed.value);
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

            var inputEmbed = TestUtils.findRenderedDOMComponentWithTag(buttonEmbedEdit, 'input');

            TestUtils.Simulate.change(inputEmbed, {target: {value: url}});

            Simulate.click(clearButton);

            assert.strictEqual('', inputEmbed.value);
        });

        it('should change embed content when url is changed', function() {
            var tweetReturnHtml = '<blockquote class="twitter-tweet" align="center">Hello Earth! Can you hear me?</blockquote>';

            sinon.stub(CKEDITOR.tools, 'jsonp', function(fn, data, success, fail) {
                success({html: tweetReturnHtml});
            });

            var cancelExclusive = sinon.stub();

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit cancelExclusive={cancelExclusive} editor={this.editor} renderExclusive={true} />, this.container);

            var inputEmbed = TestUtils.findRenderedDOMComponentWithTag(buttonEmbedEdit, 'input');

            TestUtils.Simulate.change(inputEmbed, {target: {value: url}});

            var buttonOk = TestUtils.findRenderedDOMComponentWithClass(buttonEmbedEdit, 'ae-icon-ok');

            Simulate.click(buttonOk.parentNode);

            assert.strictEqual(this.nativeEditor.getData(), '<div data-ae-embed-url="' + url + '">' + tweetReturnHtml + '</div>');
        });

        it('should change embed content when KEY_ENTER is pushed in embed input', function() {
            var tweetReturnHtml = '<blockquote class="twitter-tweet" align="center">Hello Earth! Can you hear me?</blockquote>';

            sinon.stub(CKEDITOR.tools, 'jsonp', function(fn, data, success, fail) {
                success({html: tweetReturnHtml});
            });

            var cancelExclusive = sinon.stub();

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit cancelExclusive={cancelExclusive} editor={this.editor} renderExclusive={true} />, this.container);

            var inputEmbed = TestUtils.findRenderedDOMComponentWithTag(buttonEmbedEdit, 'input');

            Simulate.change(inputEmbed, {target: {value: url}});

            Simulate.keyDown(inputEmbed, {key: "Enter", keyCode: KEY_ENTER, which: KEY_ENTER});

            assert.strictEqual(this.nativeEditor.getData(), '<div data-ae-embed-url="' + url + '">' + tweetReturnHtml + '</div>');
        });

        it('should close toolbar when KEY_ESC is pushed in embed input', function() {
            var tweetReturnHtml = '<blockquote class="twitter-tweet" align="center">Hello Earth! Can you hear me?</blockquote>';

            sinon.stub(CKEDITOR.tools, 'jsonp', function(fn, data, success, fail) {
                success({html: tweetReturnHtml});
            });

            var spy = sinon.spy();

            var buttonEmbedEdit = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit cancelExclusive={spy} editor={this.editor} renderExclusive={true} />, this.container);

            var inputEmbed = TestUtils.findRenderedDOMComponentWithTag(buttonEmbedEdit, 'input');

            Simulate.change(inputEmbed, {target: {value: url}});

            Simulate.keyDown(inputEmbed, {key: "Escape", keyCode: KEY_ESC, which: KEY_ESC});

            assert.isTrue(spy.calledOnce);
        });


    });
}());
