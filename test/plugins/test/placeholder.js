(function() {
    'use strict';

    var assert = chai.assert;
    var brFiller = CKEDITOR.env.needsBrFiller ? '<br>' : '';

    var expectedEmptyValue = {
        1: ['<p>' + brFiller + '</p>'],
        2: ['', ' ', brFiller],
        3: ['<div>' + brFiller + '</div>']
    };

    var placeholderClass = 'ae-placeholder';

    describe('Placeholder', function() {
        this.timeout(35000);

        describe('when CKEditor enterMode is CKEDITOR_ENTER_P (1)', function() {

            before(function(done) {
                Utils.createCKEditor.call(this, done, {
                    enterMode: CKEDITOR.ENTER_P,
                    extraPlugins: 'ae_placeholder',
                    placeholderClass: placeholderClass
                }, {
                    'data-placeholder': 'This is placeholder'
                });
            });

            after(Utils.destroyCKEditor);

            beforeEach(Utils.beforeEach);

            afterEach(Utils.afterEach);

            it('should assert the html value of the editor is the same as passed value on creating the instance', function() {
                var html = this.nativeEditor.editable().getHtml().trim();

                assert.isTrue(expectedEmptyValue[this.nativeEditor.config.enterMode].indexOf(html) >= 0);
            });

            it('should not change the html value after the editor is blurred when its value is empty', function() {
                var html = this.nativeEditor.editable().getHtml().trim();

                this.nativeEditor.fire('blur');

                assert.isTrue(expectedEmptyValue[this.nativeEditor.config.enterMode].indexOf(html) >= 0);
                assert.isTrue(this.nativeEditor.element.hasClass(placeholderClass));
            });

            it('should keep the value when input is blurred and input has content', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, 'This input has content');

                this.nativeEditor.fire('blur');
                assert.strictEqual(this.nativeEditor.editable().getHtml().trim(), 'This input has content');
            });

            it('should remove ae-placeholder class when nativeEditor is focused', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, 'This input has content');

                this.nativeEditor.fire('focus');
                assert.isTrue(!this.nativeEditor.element.hasClass(placeholderClass));
            });

            it('should add ae-placeholder class nativeEditor is empty and it is blurred', function() {
                this.nativeEditor.fire('blur');
                assert.isTrue(this.nativeEditor.element.hasClass(placeholderClass));
            });

            it('should remove placeholder class when editor is changed by setData', function(done) {
                this.nativeEditor.fire('blur');

                assert.isTrue(this.nativeEditor.element.hasClass(placeholderClass));

                this.nativeEditor.setData('new data');

                setTimeout(function() {
                    assert.isFalse(this.nativeEditor.element.hasClass(placeholderClass));

                    done();
                }.bind(this), 100);
            });

            it('should keep the value when image is the only content', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, '<img src="test.png"/>');

                this.nativeEditor.fire('blur');
                assert.isFalse(this.nativeEditor.element.hasClass(placeholderClass));
            });

            it('should keep the value when table is the only content', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, '<table><thead><tr><th>HEAD</th></tr></thead><tbody><tr><td></td></tr></tbody></table>');

                this.nativeEditor.fire('blur');
                assert.isFalse(this.nativeEditor.element.hasClass(placeholderClass));
            });

        });

        describe('when CKEditor enterMode is CKEDITOR_ENTER_BR (2)', function() {
            before(function(done) {
                Utils.createCKEditor.call(this, done, {
                    enterMode: CKEDITOR.ENTER_BR,
                    extraPlugins: 'ae_placeholder',
                    placeholderClass: 'ae-placeholder'
                }, {
                    'data-placeholder': 'This is placeholder'
                });
            });

            after(Utils.destroyCKEditor);

            beforeEach(Utils.beforeEach);

            afterEach(Utils.afterEach);

            it('should assert the html value of the editor is the same as passed value on creating the instance', function() {
                var html = this.nativeEditor.editable().getHtml().trim();

                assert.isTrue(expectedEmptyValue[this.nativeEditor.config.enterMode].indexOf(html) >= 0);
            });

            it('should not change the html value after the editor is blurred when its value is empty', function() {
                var html = this.nativeEditor.editable().getHtml().trim();

                this.nativeEditor.fire('blur');

                assert.isTrue(expectedEmptyValue[this.nativeEditor.config.enterMode].indexOf(html) >= 0);
                assert.isTrue(this.nativeEditor.element.hasClass(placeholderClass));

            });

            it('should keep the value when input is blurred and input has content', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, 'This input has content');

                this.nativeEditor.fire('blur');
                assert.strictEqual(this.nativeEditor.editable().getHtml().trim(), 'This input has content');
            });

            it('should remove ae-placeholder class when nativeEditor is focused', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, 'This input has content');

                this.nativeEditor.fire('focus');
                assert.isTrue(!this.nativeEditor.element.hasClass(placeholderClass));
            });

            it('should add ae-placeholder class nativeEditor is empty and it is blurred', function(done) {
                this.nativeEditor.fire('blur');

                setTimeout(function() {
                    assert.isTrue(this.nativeEditor.element.hasClass(placeholderClass));
                    done();
                }.bind(this), 200);
            });

            it('should remove placeholder class when editor is changed by setData', function(done) {
                this.nativeEditor.fire('blur');

                assert.isTrue(this.nativeEditor.element.hasClass(placeholderClass));

                this.nativeEditor.setData('new data');

                setTimeout(function() {
                    assert.isFalse(this.nativeEditor.element.hasClass(placeholderClass));

                    done();
                }.bind(this), 100);
            });

            it('should keep the value when image is the only content', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, '<img src="test.png"/>');

                this.nativeEditor.fire('blur');
                assert.isFalse(this.nativeEditor.element.hasClass(placeholderClass));
            });

            it('should keep the value when table is the only content', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, '<table><thead><tr><th>HEAD</th></tr></thead><tbody><tr><td></td></tr></tbody></table>');

                this.nativeEditor.fire('blur');
                assert.isFalse(this.nativeEditor.element.hasClass(placeholderClass));
            });

        });

        describe('when CKEditor enterMode is CKEDITOR_ENTER_DIV (3)', function() {
            before(function(done) {
                Utils.createCKEditor.call(this, done, {
                    enterMode: CKEDITOR.ENTER_DIV,
                    extraPlugins: 'ae_placeholder',
                    placeholderClass: 'ae-placeholder'
                }, {
                    'data-placeholder': 'This is placeholder'
                });
            });

            after(Utils.destroyCKEditor);

            beforeEach(Utils.beforeEach);

            afterEach(Utils.afterEach);

            it('should assert the html value of the editor is the same as passed value on creating the instance', function() {
                var html = this.nativeEditor.editable().getHtml().trim();

                assert.isTrue(expectedEmptyValue[this.nativeEditor.config.enterMode].indexOf(html) >= 0);
            });

            it('should not change the html value after the editor is blurred when its value is empty', function() {
                var html = this.nativeEditor.editable().getHtml().trim();

                this.nativeEditor.fire('blur');

                assert.isTrue(expectedEmptyValue[this.nativeEditor.config.enterMode].indexOf(html) >= 0);
                assert.isTrue(this.nativeEditor.element.hasClass(placeholderClass));

            });

            it('should keep the value when input is blurred and input has content', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, 'This input has content');

                this.nativeEditor.fire('blur');
                assert.strictEqual(this.nativeEditor.editable().getHtml().trim(), 'This input has content');
            });

            it('should remove ae-placeholder class when nativeEditor is focused', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, 'This input has content');

                this.nativeEditor.fire('focus');
                assert.isTrue(!this.nativeEditor.element.hasClass(placeholderClass));
            });

            it('should add ae-placeholder class nativeEditor is empty and it is blurred', function(done) {
                this.nativeEditor.fire('blur');

                setTimeout(function() {
                    assert.isTrue(this.nativeEditor.element.hasClass(placeholderClass));
                    done();
                }.bind(this), 200);
            });

            it('should remove placeholder class when editor is changed by setData', function(done) {
                this.nativeEditor.fire('blur');

                assert.isTrue(this.nativeEditor.element.hasClass(placeholderClass));

                this.nativeEditor.setData('new data');

                setTimeout(function() {
                    assert.isFalse(this.nativeEditor.element.hasClass(placeholderClass));

                    done();
                }.bind(this), 100);
            });

            it('should keep the value when image is the only content', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, '<img src="test.png"/>');

                this.nativeEditor.fire('blur');
                assert.isFalse(this.nativeEditor.element.hasClass(placeholderClass));
            });

            it('should keep the value when table is the only content', function() {
                bender.tools.selection.setWithHtml(this.nativeEditor, '<table><thead><tr><th>HEAD</th></tr></thead><tbody><tr><td></td></tr></tbody></table>');

                this.nativeEditor.fire('blur');
                assert.isFalse(this.nativeEditor.element.hasClass(placeholderClass));
            });
        });
    });
}());