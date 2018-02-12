(function() {
    'use strict';

    var assert = chai.assert;
    var Simulate = React.addons.TestUtils.Simulate;

    describe('ButtonTwitter', function() {
        this.timeout(35000);

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should add ae-twitter-link', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '{tweet}');

            var buttonTwitter = ReactDOM.render(<AlloyEditor.ButtonTwitter editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonTwitter));

            assert.strictEqual(1, document.getElementsByClassName('ae-twitter-link').length);
        });

        it('should create link to tweet the word that is selected', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '{tweet}');

            var buttonTwitter = ReactDOM.render(<AlloyEditor.ButtonTwitter editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonTwitter));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual('<p><a class="ae-twitter-link" href="https://twitter.com/intent/tweet?text=tweet" target="_blank">tweet</a></p>', data);
        });

        it('should add class which represents pressed button', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<a class="ae-twitter-link" href="https://twitter.com/intent/tweet?text=tweet" target="_blank">{tweet}</a>');

            var buttonTwitter = ReactDOM.render(<AlloyEditor.ButtonTwitter editor={this.editor} />, this.container);

            var buttonDOMNode = ReactDOM.findDOMNode(buttonTwitter);

            assert.strictEqual($(buttonDOMNode).hasClass('ae-button-pressed'), true);
        });

        it('should remove link to tweet when button is pressed and the selection text is link to tweet', function() {
            bender.tools.selection.setWithHtml(this.nativeEditor, '<a class="ae-twitter-link" href="https://twitter.com/intent/tweet?text=tweet" target="_blank">{tweet}</a>');

            var buttonTwitter = ReactDOM.render(<AlloyEditor.ButtonTwitter editor={this.editor} />, this.container);

            Simulate.click(ReactDOM.findDOMNode(buttonTwitter));

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual('<p>tweet</p>', data);
        });
    });
}());
