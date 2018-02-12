(function() {
    'use strict';

    var assert = chai.assert;

    describe('SelectionTest', function() {
        var getPayload = function(element, region) {
                return {
                    editor: this.editor,
                    data: {
                        selectionData: {
                            element: element,
                            region: region
                        }
                    }
                };
            };

        before(Utils.createAlloyEditor);

        after(Utils.destroyAlloyEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        describe('link', function() {
            var linkTest = AlloyEditor.SelectionTest.link;

            beforeEach(function() {
                var content = '<p><a href="#" id="editable">Link</a></p>';
                content += '<p contenteditable="false"><a href="#" id="not-editable">Link</a></p>';
                content += '<p id="not-link">Not link</p>';

                this.editor.get('nativeEditor').setData(content);
            });

            it('should not handle an element selection', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var editable = nativeEditor.element.findOne('#editable');
                var payload = getPayload.call(this, editable);

                nativeEditor.getSelection().selectElement(editable);

                assert.isFalse(linkTest(payload));
            });

            it('should handle selection that is not a link', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var notLink = nativeEditor.element.findOne('#not-link');
                var payload = getPayload.call(this, notLink);

                nativeEditor.getSelection().selectElement(notLink);
                assert.isFalse(linkTest(payload));
            });

            it('should detect the link at the edit start position', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var link = nativeEditor.element.findOne('#editable');

                var range = nativeEditor.createRange();
                range.moveToElementEditStart(link);

                nativeEditor.getSelection().selectRanges([range]);

                var payload = getPayload.call(this, link);

                assert.isTrue(linkTest(payload));
            });

            it('should not detect the link at the edit end position', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var link = nativeEditor.element.findOne('#editable');

                var range = nativeEditor.createRange();
                range.moveToElementEditEnd(link);

                nativeEditor.getSelection().selectRanges([range]);

                var payload = getPayload.call(this, link);

                assert.isFalse(linkTest(payload));
            });

            it('should handle non editable link', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var notEditable = nativeEditor.element.findOne('#not-editable');
                var payload = getPayload.call(this, notEditable);

                nativeEditor.getSelection().selectElement(notEditable);
                assert.isFalse(linkTest(payload));
            });
        });

        describe('image', function() {
            var imageTest = AlloyEditor.SelectionTest.image;

            beforeEach(function() {
                var content = '<img id="editable" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=">';
                content += '<img id="noneditable" contenteditable="false"' +
                    'src="data:image/gif;base64,R0lGODlhAQABAAAAACw=">';
                content += '<p id="not-image">Not an image</p>';

                this.editor.get('nativeEditor').setData(content);
            });

            it('should detect an image selection', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var payload = getPayload.call(this, nativeEditor.element.findOne('#editable'));

                assert.isTrue(imageTest(payload));
            });

            it('should handle selection without element', function() {
                var payload = getPayload.call(this, null);

                assert.isFalse(imageTest(payload));
            });

            it('should handle not image selection', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var payload = getPayload.call(this, nativeEditor.element.findOne('#not-image'));

                assert.isFalse(imageTest(payload));
            });

            it('should check whether is editable', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var payload = getPayload.call(this, nativeEditor.element.findOne('#not-editable'));

                assert.isFalse(imageTest(payload));
            });
        });

        describe('text', function() {
            var textTest = AlloyEditor.SelectionTest.text;

            beforeEach(function() {
                var content = '<p><span id="editable">Some editable text</span></p>';
                content += '<p contenteditable="false"><span id="not-editable">Non editable</span></p>';

                this.editor.get('nativeEditor').setData(content);
            });

            it('should detect an editable text selection', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var editable = nativeEditor.element.findOne('#editable');
                var payload = getPayload.call(this, null, []);

                nativeEditor.getSelection().selectElement(editable);
                assert.isTrue(textTest(payload));
            });

            it('should detect a non editable text selection', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var notEditable = nativeEditor.element.findOne('#not-editable');
                var payload = getPayload.call(this, null, []);

                nativeEditor.getSelection().selectElement(notEditable);
                assert.isFalse(textTest(payload));
            });

            it('should handle a selected element', function () {
                var nativeEditor = this.editor.get('nativeEditor');

                var editable = nativeEditor.element.findOne('#editable');
                var payload = getPayload.call(this, editable, []);

                nativeEditor.getSelection().selectElement(editable);
                assert.isFalse(textTest(payload));
            });

            it('should handle an empty selection', function () {
                var payload = getPayload.call(this, null, []);

                assert.isFalse(textTest(payload));
            });
        });

        describe('table', function() {
            var tableTest = AlloyEditor.SelectionTest.table;

            beforeEach(function() {
                var content = '<table id="editable"><tr><td>Editable</td></tr><table>';
                content += '<table id="not-editable" contenteditable="false"><tr><td>Not editable</td></tr><table>';
                content += '<p id="not-table">Not a table</p>';

                this.editor.get('nativeEditor').setData(content);
            });

            it('should detect a table', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var editable = nativeEditor.element.findOne('#editable');
                var payload = getPayload.call(this, editable);

                nativeEditor.getSelection().selectElement(editable);
                assert.isTrue(tableTest(payload));
            });

            it('should handle non editable table', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var notEditable = nativeEditor.element.findOne('#not-editable');
                var payload = getPayload.call(this, notEditable);

                nativeEditor.getSelection().selectElement(notEditable);
                assert.isFalse(tableTest(payload));
            });

            it('should handle not table selection', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var notTable = nativeEditor.element.findOne('#not-table');
                var payload = getPayload.call(this, notTable);

                nativeEditor.getSelection().selectElement(notTable);
                assert.isFalse(tableTest(payload));
            });
        });

        describe('embed', function() {
            var embedTest = AlloyEditor.SelectionTest.embed;

            beforeEach(function() {
                var content = '<div id="embed" data-ae-embed-url="#" data-cke-widget-upcasted="1" data-widget="ae_embed" class="cke_widget_element">http//alloyeditor.com/demo/</div>';

                content += '<div id="not_ae_embed" data-ae-embed-url="#" data-cke-widget-upcasted="1" data-widget="not_ae_embed" class="cke_widget_element">http//alloyeditor.com/demo/</div>';
                content += '<p id="not-embed">Not a embed</p>';

                this.editor.get('nativeEditor').setData(content);
            });

            it('should detect a embed', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var embed = nativeEditor.element.findOne('#embed');

                var payload = getPayload.call(this, embed);

                nativeEditor.getSelection().selectElement(embed);
                assert.isTrue(embedTest(payload));
            });

            it('should handle non data-widget embed', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var notEmbed = nativeEditor.element.findOne('#not_ae_embed');

                var payload = getPayload.call(this, notEmbed);

                nativeEditor.getSelection().selectElement(notEmbed);
                assert.isFalse(embedTest(payload));
            });

            it('should handle not embed selection', function() {
                var nativeEditor = this.editor.get('nativeEditor');

                var notEmbed = nativeEditor.element.findOne('#not-embed');

                var payload = getPayload.call(this, notEmbed);

                nativeEditor.getSelection().selectElement(notEmbed);
                assert.isFalse(embedTest(payload));
            });
        });
    });
}());
