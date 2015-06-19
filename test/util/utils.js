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

        beforeEach: function(done) {
            Utils.createContainer.call(this);

            // CKEDITOR in Firefox needs to have cursor and at least an empty string
            // before doing anything ;)
            bender.tools.selection.setWithHtml(this.nativeEditor, ' {}');

            if (done) {
                done();
            }
        },

        createCKEditor: function(done, config) {
            var editable = document.createElement('div');

            editable.setAttribute('id', 'editable');
            editable.setAttribute('contenteditable', true);

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

        getFixtures: function(fixtureBase, fixtureFile) {
            return function(fixtureName) {
                var fixtureData = {};

                fixture.setBase(fixtureBase);

                fixture.load(fixtureFile);

                var htmlFixture = fixture.el.querySelector('#' + fixtureName);

                fixtureData.initial = Utils._prepareFixtureForAssertion(htmlFixture.querySelector('[data-fixture="initial"]'));
                fixtureData.expected = Utils._prepareFixtureForAssertion(htmlFixture.querySelector('[data-fixture="expected"]'));

                return fixtureData;
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