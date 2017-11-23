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

    var doTestIE = function() {
        if (!CKEDITOR.env.ie || CKEDITOR.env.edge) {
            this.skip();
        }
        return;
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

            it('should not redirect when clicking on links', function() {
                var spy = sinon.spy(this.alloyEditor, '_redirectLink');

                bender.tools.selection.setWithHtml(this.alloyEditor.get('nativeEditor'), '<a id="link_foo" href="foo.com">Foo</a>');

                happen.click(document.getElementById('link_foo'));

                assert.isFalse(spy.called);
            });

            it('should redirect when clicking on links and readonly has been changed to true', function() {
                var nativeEditor = this.alloyEditor.get('nativeEditor');

                nativeEditor.setReadOnly(true);

                // Stub `_redirectLink` method to avoid page refreshes during the test
                var stub = sinon.stub(this.alloyEditor, '_redirectLink');

                bender.tools.selection.setWithHtml(nativeEditor, '<a id="link_foo" href="foo.com">Foo</a>');

                happen.click(document.getElementById('link_foo'));

                assert.isFalse(stub.calledOnce);
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

            it('should open a new window when clicking in links with a target attribute', function() {
                var stub = sinon.stub(window, 'open');

                bender.tools.selection.setWithHtml(this.alloyEditor.get('nativeEditor'), '<a id="link_foo" href="foo.com" target="_blank">Foo</a>');

                happen.click(document.getElementById('link_foo'));

                stub.restore();

                assert.isTrue(stub.calledOnce);
            });

            it('should update the current window url when clicking in links without a target attribute', function() {
                var locationHref = window.location.href;

                bender.tools.selection.setWithHtml(this.alloyEditor.get('nativeEditor'), '<a id="link_foo" href="#foo">Foo</a>');

                happen.click(document.getElementById('link_foo'));

                assert.strictEqual(window.location.href, locationHref + '#foo');
            });

            it('should not redirect when clicking on links and readonly has been set to', function() {
                var nativeEditor = this.alloyEditor.get('nativeEditor');

                nativeEditor.setReadOnly(false);

                var stub = sinon.stub(this.alloyEditor, '_redirectLink');

                bender.tools.selection.setWithHtml(nativeEditor, '<a id="link_foo" href="foo.com">Foo</a>');

                var link = document.getElementById('link_foo');

                happen.click(link);

                assert.strictEqual(1, stub.callCount);
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

        describe('getButtons API', function() {
            beforeEach(function(done) {
                initEditor.call(this, done);
            });

            afterEach(function() {
                cleanUpEditor.call(this);
            });

            it('should return a function that returns a buttons array when invoked', function() {
                var buttonsFn = AlloyEditor.getButtons([]);
                var buttons = buttonsFn.call(this);

                assert.isFunction(buttonsFn);
                assert.isArray(buttons);
            });

            it('should expand registered bridged plugin buttons', function() {
                AlloyEditor.registerBridgeButton('bar', 'foo');
                AlloyEditor.registerBridgeButton('baz', 'foo');

                var buttons = AlloyEditor.getButtons(['foo']).call(this);

                assert.isArray(buttons);
                assert.sameMembers(['bar', 'baz'], buttons);
            });

            it('should not modify the elements that are not bridged', function() {
                var buttons = AlloyEditor.getButtons(['foo2', 'bar2']).call(this);

                assert.isArray(buttons);
                assert.sameMembers(['foo2', 'bar2'], buttons);
            });
        });

        describe('in IE browsers', function () {
            this.timeout(35000);

            beforeEach(function() {
                doTestIE.call(this);
            });

            afterEach(function() {
                cleanUpEditor.call(this);
            });

            it('should use the ae_dragresize_ie plugin instead of ae_dragresize by default', function(done) {
                doTestIE.call(this);

                initEditor.call(this, function() {
                    assert.isTrue(this.alloyEditor.get('nativeEditor').config.extraPlugins.indexOf('ae_dragresize_ie') >= 0);
                    done();
                }.bind(this));
            });

            it('should use the ae_dragresize_ie plugin even if the ae_dragresize is passed in the editor configuration', function(done) {
                initEditor.call(this, function() {
                    assert.isTrue(this.alloyEditor.get('nativeEditor').config.extraPlugins.indexOf('ae_dragresize_ie') >= 0);
                    done();
                }.bind(this), {
                    extraPlugins: 'ae_dragresize'
                });
            });
        });
    });
}());