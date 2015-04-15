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

        createAlloyEditor: function(done, config) {
            var editable = document.createElement('div');

            editable.setAttribute('id', 'editable');
            editable.setAttribute('contenteditable', true);

            document.getElementsByTagName('body')[0].appendChild(editable);

            this._editable = editable;

            assert.ok(bender);
            assert.ok(CKEDITOR);
            assert.ok(AlloyEditor);

            config = CKEDITOR.tools.merge({
                toolbars: {}
            }, config);

            this.editor = AlloyEditor.editable('editable', config);

            this.nativeEditor = this.editor.get('nativeEditor');

            this.nativeEditor.on('instanceReady', function() {
                this.nativeEditor.focus();

                done();
            }.bind(this));
        },

        createContainer: function() {
            this.container = document.createElement('div');

            document.body.appendChild(this.container);
        },

        destroyAlloyEditor: function(done) {
            if (this.editor) {
                this.editor.destroy();
            }

            this._editable.parentNode.removeChild(this._editable);

            if (done) {
                done();
            }
        },

        getFixtures: function(fixtureFile, fixtureName) {
            var fixtureData = {};

            fixture.setBase('src/ui/react/test/fixtures');

            fixture.load(fixtureFile);

            var htmlFixture = fixture.el.querySelector('#' + fixtureName);

            fixtureData.initial = Utils._prepareFixtureForAssertion(htmlFixture.querySelector('[data-fixture="initial"]'));
            fixtureData.expected = Utils._prepareFixtureForAssertion(htmlFixture.querySelector('[data-fixture="expected"]'));

            return fixtureData;
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