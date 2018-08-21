(function() {
    'use strict';

    var Utils = {
        afterEach: function(done) {
            Utils.removeContainer.call(this);

            fixture.cleanup();

            if (done) {
                done();
            }
        },

        assertResult: function(fixtureBase) {
            var getFixture = Utils.getFixture(fixtureBase);

            return function(initialFixture, command, expectedFixture, message) {
                var initial = getFixture(initialFixture);
                var expected = getFixture(expectedFixture);

                bender.tools.selection.setWithHtml(this.nativeEditor, initial);

                command.call(this);

                var data = bender.tools.getData(this.nativeEditor, {
                    fixHtml: true,
                    compatHtml: true
                });

                assert.strictEqual(data, expected, message);
            };
        },

        beforeEach: function(done) {
            Utils.createContainer.call(this);

            // CKEDITOR in Firefox needs to have cursor and at least an empty string
            // before doing anything ;)
            bender.tools.selection.setWithHtml(this.nativeEditor, ' {}');

            if (done) {
                done();
            }
        },

        createCKEditor: function(done, config, attributes) {
            var editable = document.createElement('div');

            editable.setAttribute('id', 'editable');
            editable.setAttribute('contenteditable', true);

            if (attributes) {
                for (var attribute in attributes) {
                    if (Object.prototype.hasOwnProperty.call(attributes, attribute)) {
                        editable.setAttribute(attribute, attributes[attribute]);
                    }
                }
            }

            document.getElementsByTagName('body')[0].appendChild(editable);

            this._editable = editable;

            assert.ok(bender);
            assert.ok(CKEDITOR);

            this.nativeEditor = CKEDITOR.inline('editable', config);

            this.nativeEditor.on('instanceReady', function() {
                this.nativeEditor.focus();

                done();
            }.bind(this));
        },

        createContainer: function() {
            this.container = document.createElement('div');

            document.body.appendChild(this.container);
        },

        destroyCKEditor: function(done) {
            if (this.nativeEditor) {
                this.nativeEditor.destroy();
            }

            this._editable.parentNode.removeChild(this._editable);

            if (done) {
                done();
            }
        },

        focusEditor: function(editor) {
            editor.focus();

            // Firefox needs a stronger focus simulation
            editor.editable().fire('focus', {$: {}});
        },

        getFixture: function(fixtureBase) {
            return function(fixtureFile) {
                fixture.setBase(fixtureBase);

                fixture.load(fixtureFile);

                return Utils._prepareFixtureForAssertion(fixture.el);
            };
        },

        removeContainer: function() {
            this.container.parentNode.removeChild(this.container);
        },

        _prepareFixtureForAssertion: function(htmlFixture) {
            var fixtureString;

            if (htmlFixture) {
                fixtureString = bender.tools.fixHtml(
                    bender.tools.compatHtml(htmlFixture.innerHTML.replace(/\u00a0/g, '&nbsp;'))
                );
            }

            return fixtureString;
        }
    };

    window.Utils = Utils;
}());