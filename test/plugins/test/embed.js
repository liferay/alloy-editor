(function() {
    'use strict';

    var assert = chai.assert;

    describe('Embed', function() {
        this.timeout(35000);

        before(function(done) {
            Utils.createCKEditor.call(this, done, {extraPlugins: 'ae_embed'});
        });

        after(Utils.destroyCKEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should not convert links inside content', function() {
            var nativeEditor = this.nativeEditor;

            bender.tools.selection.setWithHtml(nativeEditor, 'There should be a {selection} here.');

            nativeEditor.execCommand = sinon.stub();

            nativeEditor.fire('paste', {
                dataValue: 'this a <a href="http://test"></a> test'
            });

            assert.isTrue(nativeEditor.execCommand.notCalled);
        });

        it('should create embed content when url is pasted', function(done) {
            var url = 'https://foo.com';

            var tweetReturnHtml = '<blockquote class="twitter-tweet" align="center">Hello Earth! Can you hear me?</blockquote>';

            sinon.stub(CKEDITOR.tools, 'jsonp', function(fn, data, success, fail) {
                success({html: tweetReturnHtml});
            });

            var nativeEditor = this.nativeEditor;

            bender.tools.selection.setWithHtml(nativeEditor, '{selection}');

            nativeEditor.fire('paste', {
                dataValue: url
            });

            setTimeout(function() {
                assert.strictEqual(nativeEditor.getData(), '<div data-ae-embed-url="' + url + '">' + tweetReturnHtml + '</div>');
                CKEDITOR.tools.jsonp.restore();
                done();
            }, 500);

        });

        it('should create embed content only with url when url is pasted and it does not retrieve content', function(done) {
            var url = "http://bar.com";

            sinon.stub(CKEDITOR.tools, 'jsonp', function(fn, data, success, fail) {
                success({});
            });

            var nativeEditor = this.nativeEditor;

            bender.tools.selection.setWithHtml(nativeEditor, '{selection}');

            nativeEditor.fire('paste', {
                dataValue: url
            });

            setTimeout(function() {
                assert.strictEqual(nativeEditor.getData(), '<div data-ae-embed-url="' + url + '">' + url + '</div>');
                CKEDITOR.tools.jsonp.restore();
                done();
            }, 500);

        });

        it('should dont create embed content when wrong url (ie: without http protocol) is added', function(done) {
            var url = "foo.com";

            sinon.stub(CKEDITOR.tools, 'jsonp', function(fn, data, success, fail) {
                fail({});
            });

            var nativeEditor = this.nativeEditor;

            bender.tools.selection.setWithHtml(nativeEditor, '{selection}');

            nativeEditor.fire('paste', {
                dataValue: url
            });

            setTimeout(function() {
                assert.strictEqual('<p>' + url + '</p>', nativeEditor.getData());
                CKEDITOR.tools.jsonp.restore();
                done();
            }, 500);

        });
    });
}());