(function() {
    'use strict';

    var assert = chai.assert;

    var TestUtils = React.addons.TestUtils;

    var Simulate = TestUtils.Simulate;

    var url = "https://foo.com";

    describe('ButtonEmbedEdit', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should embed area is removed when embed remove button is clicked', function() {

            var embedDiv = '<div id="embed_area" tabindex="-1" contenteditable="false" data-cke-widget-wrapper="1" data-cke-filter="off" class="cke_widget_wrapper cke_widget_new cke_widget_block" data-cke-display-name="div">' +
                '<div id="embed" data-ae-embed-url="#" ' +
                ' data-cke-widget-upcasted="1" data-widget="ae_embed" ' +
                'class="cke_widget_element">http//alloyeditor.com/demo/</div></div>';


            var buttonEmbedRemove = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit editor={this.editor} />, this.container);

            /**
            * Set data with embed div
            * buttonEmbedRemove.setState simulates and forces that element is selected
            */

            this.nativeEditor.setData(embedDiv);

            var embedElement = this.nativeEditor.element.findOne('#embed');

            buttonEmbedRemove.setState({element: embedElement});

            var buttonRemove = TestUtils.findRenderedDOMComponentWithClass(buttonEmbedRemove, 'ae-icon-bin');

            Simulate.click(buttonRemove.parentNode);

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '');
        });

        it('should be disable ok button when url is not changed', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<div data-ae-embed-url="' + url + '">' + url + '</div>');

            var cancelExclusive = sinon.stub();

            var buttonEmbedRemove = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit cancelExclusive={cancelExclusive} editor={this.editor} />, this.container);

            var embedDiv = this.nativeEditor.element.findOne('[data-ae-embed-url="' + url + '"]');

            //Select element to associate with Toolbar editor
            this.nativeEditor.getSelection().selectElement(embedDiv);

            var buttonOk = TestUtils.findRenderedDOMComponentWithClass(buttonEmbedRemove, 'ae-icon-ok');

            assert.isTrue(buttonOk.parentNode.hasAttribute('disabled'));

        });

        it('should clear input when remove button into input is clicked', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<div data-ae-embed-url="' + url + '">' + url + '</div>');

            var cancelExclusive = sinon.stub();

            var buttonEmbedRemove = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit cancelExclusive={cancelExclusive} editor={this.editor} />, this.container);

            var embedDiv = this.nativeEditor.element.findOne('[data-ae-embed-url="' + url + '"]');

            //Select element to associate with Toolbar editor
            this.nativeEditor.getSelection().selectElement(embedDiv);

            var clearButton = TestUtils.findRenderedDOMComponentWithClass(buttonEmbedRemove, 'ae-icon-remove');

            Simulate.click(clearButton);

            var inputEmbed = TestUtils.findRenderedDOMComponentWithTag(buttonEmbedRemove, 'input');

            assert.strictEqual('', inputEmbed.value);
        });

        it('should change embed content when url is changed', function(done) {

            var tweetReturnHtml = '<blockquote class="twitter-tweet" align="center">Hello Earth! Can you hear me?</blockquote>';

            sinon.stub(CKEDITOR.tools, 'jsonp', function(fn, data, success, fail) {
                success({html: tweetReturnHtml});
            });

            bender.tools.selection.setWithHtml(this.nativeEditor, '<div data-ae-embed-url="http://test">http://test</div>');

            var cancelExclusive = sinon.stub();

            var buttonEmbedRemove = ReactDOM.render(<AlloyEditor.ButtonEmbedEdit cancelExclusive={cancelExclusive} editor={this.editor} />, this.container);

            var embedDiv = this.nativeEditor.element.findOne('[data-ae-embed-url="http://test"]');

            //Select element to associate with Toolbar editor
            this.nativeEditor.getSelection().selectElement(embedDiv);

            var inputEmbed = TestUtils.findRenderedDOMComponentWithTag(buttonEmbedRemove, 'input');

             TestUtils.Simulate.change(inputEmbed, {target: {value: url}});

             var buttonOk = TestUtils.findRenderedDOMComponentWithClass(buttonEmbedRemove, 'ae-icon-ok');

             Simulate.click(buttonOk.parentNode);

             setTimeout(function() {
                 assert.strictEqual(this.nativeEditor.getData(), '<div data-ae-embed-url="' + url + '">' + tweetReturnHtml + '</div>');
                 CKEDITOR.tools.jsonp.restore();
                 done();
             }.bind(this), 500);

         });

    });
}());
