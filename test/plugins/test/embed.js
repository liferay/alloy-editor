(function() {
    'use strict';

    var assert = chai.assert;

    describe.only('Embed', function() {
        this.timeout(35000);

        before(function(done) {
            Utils.createCKEditor.call(this, done, {extraPlugins: 'ae_embed'});
        });

        after(Utils.destroyCKEditor);

        beforeEach(Utils.beforeEach);

        afterEach(function(done) {
            if (CKEDITOR.tools.jsonp.restore) {
                CKEDITOR.tools.jsonp.restore();
            }

            Utils.afterEach.call(this, done);
        });

        it('should not convert links inside content', function() {
            var nativeEditor = this.nativeEditor;

            var spy = sinon.spy(nativeEditor, 'execCommand');

            bender.tools.selection.setWithHtml(nativeEditor, 'There should be a {selection} here.');

            nativeEditor.fire('paste', {
                dataValue: 'this a <a href="http://test"></a> test'
            });

            assert.isTrue(spy.notCalled);
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
                done();
            }, 500);

        });
    });
}());