(function() {
    'use strict';

    var assert = chai.assert;

    var cleanUpEditor = function() {
        if (this.alloyEditor) {
            this.alloyEditor.destroy();
            this.alloyEditor = null;
        }

        document.body.removeChild(this.el);
    };

    var initEditor = function(done, config) {
        this.el = document.createElement('div');
        this.el.setAttribute('id', 'editable');
        document.body.appendChild(this.el);

        this.alloyEditor = AlloyEditor.editable('editable', config);

        this.alloyEditor.get('nativeEditor').once('instanceReady', function() {
            done();
        });
    };

    describe('AlloyEditor', function() {
        this.timeout(35000);

        describe('with default enableContentEditable config', function() {
            beforeEach(function(done) {
                initEditor.call(this, done);
            });

            afterEach(function() {
                cleanUpEditor.call(this);
            });

            it('should set contenteditable to true', function() {
                assert.isTrue(this.el.isContentEditable);
            });

            it('should set contenteditable attribute to false on editor destroying', function() {
                var editable = this.alloyEditor.get('nativeEditor').editable();

                this.alloyEditor.destroy();
                this.alloyEditor = null;
                assert.strictEqual('false', editable.getAttribute('contenteditable'));
            });
        });

        describe('with enableContentEditable set to true', function() {
            beforeEach(function(done) {
                initEditor.call(this, done, {
                    enableContentEditable: true
                });
            });

            afterEach(function() {
                cleanUpEditor.call(this);
            });

            it('should set contenteditable to true', function() {
                assert.isTrue(this.el.isContentEditable);
            });

            it('should set contenteditable attribute to false on editor destroying', function() {
                var editable = this.alloyEditor.get('nativeEditor').editable();

                this.alloyEditor.destroy();
                this.alloyEditor = null;
                assert.strictEqual('false', editable.getAttribute('contenteditable'));
            });
        });

        describe('with enableContentEditable set to false', function() {
            beforeEach(function(done) {
                initEditor.call(this, done, {
                    enableContentEditable: false
                });
            });

            afterEach(function() {
                cleanUpEditor.call(this);
            });

            it('should not force the srcNode to be contenteditable', function() {
                assert.isFalse(this.el.isContentEditable);
            });

            it('should leave contenteditable attribute to false on editor destroying', function() {
                var editable = this.alloyEditor.get('nativeEditor').editable();

                this.alloyEditor.destroy();
                this.alloyEditor = null;
                assert.strictEqual('false', editable.getAttribute('contenteditable'));
            });
        });

        describe('ae-editable class handling', function() {
            beforeEach(function(done) {
                initEditor.call(this, done);
            });

            afterEach(function() {
                cleanUpEditor.call(this);
            });

            it('should add ae-editable class to the editable element', function() {
                assert.isTrue(this.alloyEditor.get('nativeEditor').editable().hasClass('ae-editable'));
            });

            it('should remove ae-editable class from the editable element on editor destroying', function() {
                var editable = this.alloyEditor.get('nativeEditor').editable();

                this.alloyEditor.destroy();
                this.alloyEditor = null;
                assert.isFalse(editable.hasClass('ae-editable'));
            });
        });

        describe('UI component integration', function() {
            beforeEach(function(done) {
                initEditor.call(this, done);
            });

            afterEach(function() {
                cleanUpEditor.call(this);
            });

            it('should fire an editorUpdate event when the component state changes', function(done) {
                var onEditorUpdate = sinon.stub();

                var alloyEditor = this.alloyEditor;

                var nativeEditor = alloyEditor.get('nativeEditor');

                nativeEditor.on('editorUpdate', onEditorUpdate);

                nativeEditor.on('uiReady', function() {
                    alloyEditor._mainUI.setState({hidden: true});

                    assert.ok(onEditorUpdate.calledOnce);

                    done();
                });
            });
        });

        describe('with readOnly set to false', function() {
            beforeEach(function(done) {
                initEditor.call(this, done);
            });

            afterEach(function() {
                cleanUpEditor.call(this);
            });

            it('should not redirect when navigate links', function() {
                var stub = sinon.stub(this.alloyEditor, '_redirectLink');

                bender.tools.selection.setWithHtml(this.alloyEditor._editor, '{<a id="link_foo" href="foo.com">Foo</a>}');

                var link = document.getElementById('link_foo');

                happen.click(link);

                assert.strictEqual(0, stub.callCount);
            });

            it('should redirect when navigate links and readonly is activated', function() {
                this.alloyEditor._editor.setReadOnly(true);

                var stub = sinon.stub(this.alloyEditor, '_redirectLink');

                bender.tools.selection.setWithHtml(this.alloyEditor._editor, '{<a id="link_foo" href="foo.com">Foo</a>}');

                var link = document.getElementById('link_foo');

                happen.click(link);

                assert.isTrue(stub.calledOnce);
            });
        });

        describe('with readonly set to true', function() {
            beforeEach(function(done) {
                initEditor.call(this, done, {
                    readOnly: true
                });
            });

            afterEach(function() {
                cleanUpEditor.call(this);
            });

            it('should be readonly mode is activated', function() {
                assert.isTrue(this.alloyEditor._editor.readOnly);
            });

            it('should redirect when navigate links', function() {
                var stub = sinon.stub(this.alloyEditor, '_redirectLink');

                bender.tools.selection.setWithHtml(this.alloyEditor._editor, '{<a id="link_foo" href="foo.com">Foo</a>}');

                var link = document.getElementById('link_foo');

                happen.click(link);

                assert.isTrue(stub.calledOnce);
            });

            it('should not redirect when navigate links and editable mode is activated', function() {
                this.alloyEditor._editor.setReadOnly(false);

                var stub = sinon.stub(this.alloyEditor, '_redirectLink');

                bender.tools.selection.setWithHtml(this.alloyEditor._editor, '{<a id="link_foo" href="foo.com">Foo</a>}');

                var link = document.getElementById('link_foo');

                happen.click(link);

                assert.strictEqual(0, stub.callCount);
            });
        });

        it('should create an instance when the passed srcNode is a DOM element', function(done) {
            var el = document.createElement('div');
            el.setAttribute('id', 'editable1');
            document.body.appendChild(el);
            assert.doesNotThrow(function() {
                try {
                    var alloyEditor = AlloyEditor.editable(el);

                    alloyEditor.get('nativeEditor').on('instanceReady', function() {
                        alloyEditor.destroy();
                        done();
                    });
                } finally {
                    document.body.removeChild(el);
                }
            });
        });

        it('should create an instance when the passed srcNode is a string', function(done) {
            var el = document.createElement('div');
            el.setAttribute('id', 'editable1');
            document.body.appendChild(el);

            assert.doesNotThrow(function() {
                try {
                    var alloyEditor = AlloyEditor.editable('editable1');

                    alloyEditor.get('nativeEditor').on('instanceReady', function() {
                        alloyEditor.destroy();
                        done();
                    });
                } finally {
                    document.body.removeChild(el);
                }
            });
        });

        it('should load language files when requested explicitly', function(done) {
            var langResourcesLoaded = sinon.stub();

            AlloyEditor.loadLanguageResources(langResourcesLoaded);

            setTimeout(function() {
                assert(langResourcesLoaded.calledOnce);
                assert.property(AlloyEditor, 'Strings');
                done();
            }, 50);
        });
    });
}());