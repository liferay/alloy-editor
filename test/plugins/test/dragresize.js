(function() {
    'use strict';

    var assert = chai.assert;

    var skipTestIE = function() {
        if (CKEDITOR.env.ie) {
            this.skip();
        }
    };

    describe('imageScaleResize', function() {

        var url = 'http://localhost/url_test';

        describe('default value "both"', function() {
            this.timeout(35000);

            before(function(done) {
                Utils.createCKEditor.call(this, done, {extraPlugins: 'ae_dragresize'});
            });

            after(Utils.destroyCKEditor);

            beforeEach(Utils.beforeEach);

            afterEach(Utils.afterEach);

            it('should have all resize handlers', function() {
                skipTestIE.call(this);

                bender.tools.selection.setWithHtml(this.nativeEditor, 'Test image dragresize plugin {<img src="url_test" />} here.');

                var handlers = document.getElementsByTagName('i');

                assert.strictEqual(handlers.length, 8);
            });

            it('should have backgroundImage equal than src of the img when mousedown is fired by some handle', function(done) {
                skipTestIE.call(this);

                bender.tools.selection.setWithHtml(this.nativeEditor, 'Test image dragresize plugin {<img src="' + url + '" />} here.');

                var handlers = document.getElementsByTagName('i');

                happen.mousedown(handlers[0]);

                setTimeout(function() {
                    var span = document.getElementsByTagName('span')[0];

                    assert.strictEqual('url("' + url + '")', span.style.backgroundImage);

                    done();
                }.bind(this), 0);
            });
        });

        describe('value "scale', function() {
            this.timeout(35000);

            before(function(done) {
                Utils.createCKEditor.call(this, done, {extraPlugins: 'ae_dragresize', imageScaleResize: 'scale'});
            });

            after(Utils.destroyCKEditor);

            beforeEach(Utils.beforeEach);

            afterEach(Utils.afterEach);

            it('Should have 4 handlers', function() {
                skipTestIE.call(this);

                bender.tools.selection.setWithHtml(this.nativeEditor, 'Test image dragresize plugin {<img src="' + url + '" />} here.');

                var handlers = document.getElementsByTagName('i');

                assert.strictEqual(handlers.length, 4);
            });
        });

        describe('value "width"', function() {
            this.timeout(35000);

            before(function(done) {
                Utils.createCKEditor.call(this, done, {extraPlugins: 'ae_dragresize', imageScaleResize: 'width'});
            });

            after(Utils.destroyCKEditor);

            beforeEach(Utils.beforeEach);

            afterEach(Utils.afterEach);

            it('Should have 6 handlers', function() {
                skipTestIE.call(this);

                bender.tools.selection.setWithHtml(this.nativeEditor, 'Test image dragresize plugin {<img src="' + url + '" />} here.');

                var handlers = document.getElementsByTagName('i');

                assert.strictEqual(handlers.length, 6);
            });
        });

        describe('"height" value', function() {
            this.timeout(35000);

            before(function(done) {
                Utils.createCKEditor.call(this, done, {extraPlugins: 'ae_dragresize', imageScaleResize: 'height'});
            });

            after(Utils.destroyCKEditor);

            beforeEach(Utils.beforeEach);

            afterEach(Utils.afterEach);

            it('Should have 6 handlers', function() {
                skipTestIE.call(this);

                bender.tools.selection.setWithHtml(this.nativeEditor, 'Test image dragresize plugin {<img src="' + url + '" />} here.');

                var handlers = document.getElementsByTagName('i');

                assert.strictEqual(handlers.length, 6);
            });
        });
    });
}());