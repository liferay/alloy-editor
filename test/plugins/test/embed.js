(function() {
    'use strict';

    var assert = chai.assert;

    describe('Embed plugin', function() {
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

            if (this.nativeEditor.insertHtml.restore) {
                this.nativeEditor.insertHtml.restore();
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

        it('should create embed content when url is pasted and its provider is Twitter', function() {
            var url = 'https://foo.com';

            var tweetReturnHtml = '<blockquote class="twitter-tweet" align="center">Hello Earth! Can you hear me?</blockquote>';

            sinon.stub(CKEDITOR.tools, 'jsonp', function(fn, data, success, fail) {
                success({html: tweetReturnHtml, provider_name: 'Twitter'});
            });

            var nativeEditor = this.nativeEditor;

            bender.tools.selection.setWithHtml(nativeEditor, '{}');

            nativeEditor.fire('paste', {
                dataValue: url
            });

            assert.strictEqual(nativeEditor.getData(), '<div data-ae-embed-url="' + url + '">' + tweetReturnHtml + '</div>');
        });

        it('should create embed content when url is pasted and its provider is YouTube', function() {
            var url = 'https://foo.com';

            var tweetReturnHtml = '<blockquote class="twitter-tweet" align="center">Hello Earth! Can you hear me?</blockquote>';

            sinon.stub(CKEDITOR.tools, 'jsonp', function(fn, data, success, fail) {
                success({html: tweetReturnHtml, provider_name: 'YouTube'});
            });

            var nativeEditor = this.nativeEditor;

            bender.tools.selection.setWithHtml(nativeEditor, '{}');

            nativeEditor.fire('paste', {
                dataValue: url
            });

            assert.strictEqual(nativeEditor.getData(), '<div data-ae-embed-url="' + url + '">' + tweetReturnHtml + '</div>');
        });

        it('should create embed content only with url when url is pasted and it is not into providers YouTube or Twitter', function() {
            var url = 'https://foo.com';

            var tweetReturnHtml = '<blockquote class="twitter-tweet" align="center">Hello Earth! Can you hear me?</blockquote>';

            sinon.stub(CKEDITOR.tools, 'jsonp', function(fn, data, success, fail) {
                success({html: tweetReturnHtml, provider_name: 'other_provider'});
            });

            var nativeEditor = this.nativeEditor;

            var isCalled = false;

            sinon.stub(nativeEditor, 'insertHtml', function() {
                isCalled = true;
                return;
            });

            bender.tools.selection.setWithHtml(nativeEditor, '{}');

            nativeEditor.fire('paste', {
                dataValue: url
            });

            assert.isTrue(isCalled);
        });

        it('should create a tag with url as href when url is pasted and there is a connection error', function() {
            var url = 'https://foo.com';

            sinon.stub(CKEDITOR.tools, 'jsonp', function(fn, data, success, fail) {
                fail({});
            });

            var nativeEditor = this.nativeEditor;

            var isCalled = false;

            sinon.stub(nativeEditor, 'insertHtml', function() {
                isCalled = true;
                return;
            });

            bender.tools.selection.setWithHtml(nativeEditor, '{}');

            nativeEditor.fire('paste', {
                dataValue: url
            });

            assert.isTrue(isCalled);
        });
    });
}());