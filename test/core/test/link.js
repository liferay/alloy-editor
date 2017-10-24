(function() {
    'use strict';

    var assert = chai.assert;

    describe('Link', function() {
        this.timeout(35000);

        before(Utils.createCKEditor);

        after(Utils.destroyCKEditor);

        beforeEach(Utils.beforeEach);

        afterEach(Utils.afterEach);

        it('should create a link from a selection', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, 'set a {selection} and then convert it to a link.');

            link.create('http://test.com', {
                target: '_blank'
            });

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>set a <a href="http://test.com" target="_blank">selection</a> and then convert it to a link.</p>');
        });

        it('should create a link from an empty selection', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, 'set a {} and then convert it to a link.');

            link.create('http://test.com', {
                target: '_blank'
            });

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>set a <a href="http://test.com" target="_blank">http://test.com</a> and then convert it to a link.</p>');
        });

        it('should add default protocol when creating a link', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, 'set a {selection} and then convert it to a link.');

            link.create('test.com', {
                target: '_blank'
            });

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>set a <a href="http://test.com" target="_blank">selection</a> and then convert it to a link.</p>');
        });

        it('should not add default protocol if it already has one', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, 'set a {selection} and then convert it to a link.');

            link.create('//test.com', {
                target: '_blank'
            });

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>set a <a href="//test.com" target="_blank">selection</a> and then convert it to a link.</p>');
        });

        it('should not add default protocol if link is an on page bookmark', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, 'set a {selection} and then convert it to a link.');

            link.create('#bookmark', {
                target: '_blank'
            });

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>set a <a href="#bookmark" target="_blank">selection</a> and then convert it to a link.</p>');
        });

        it('should add mailto: when creating an email link', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, 'set a {selection} and then convert it to a link.');

            link.create('test@example.com', {
                target: '_self'
            });

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>set a <a href="mailto:test@example.com" target="_self">selection</a> and then convert it to a link.</p>');
        });

        it('should not add mailto: to an email link if it already has mailto:', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, 'set a {selection} and then convert it to a link.');

            link.create('mailto:test@example.com', {
                target: '_self'
            });

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>set a <a href="mailto:test@example.com" target="_self">selection</a> and then convert it to a link.</p>');
        });

        it('should not add mailto: to a link with an @ if after a forward slash', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, 'set a {selection} and then convert it to a link.');

            link.create('medium.com/@whoever/something-else', {
                target: '_blank'
            });

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>set a <a href="http://medium.com/@whoever/something-else" target="_blank">selection</a> and then convert it to a link.</p>');
        });

        it('should retrieve a link from a selection', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>get a link from {<a target="_blank" href="http://test.com">selection</a>}.</p>');

            var linkEl = link.getFromSelection();

            assert.ok(linkEl);
            assert.strictEqual('a', linkEl.getName());
            assert.strictEqual('http://test.com', linkEl.getAttribute('href'));
        });

        it('should retrieve a link from text selection', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>get a link from <a href="http://test.com" target="_blank">se{lect}ion</a>.</p>');

            var linkEl = link.getFromSelection();

            assert.ok(linkEl);
            assert.strictEqual('a', linkEl.getName());
            assert.strictEqual('http://test.com', linkEl.getAttribute('href'));
        });

        it('should return null when there is text selection but not link', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>get a link from {selection}.</p>');

            var linkEl = link.getFromSelection();

            assert.strictEqual(null, linkEl);
        });

        it('should remove a passed link element', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>remove a link from a {<a href="http://test.com" target="_blank">selection</a>}.</p>');

            var linkEl = link.getFromSelection();
            assert.ok(linkEl);

            link.remove(linkEl);

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual('<p>remove a link from a selection.</p>', data);
        });

        it('should remove a link from a selection', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>remove a link from a {<a href="http://test.com" target="_blank">selection</a>}.</p>');

            link.remove();

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual('<p>remove a link from a selection.</p>', data);
        });

        it('should update the URL of a passed link element', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>update the URL of a {<a href="http://test.com" target="_blank">link</a>}.</p>');

            var linkEl = link.getFromSelection();
            assert.ok(linkEl);

            link.update('http://new.com', linkEl);

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>update the url of a <a href="http://new.com" target="_blank">link</a>.</p>');
        });

        it('should update the URL of a link from selection', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>update the url of a {<a href="http://test.com" target="_blank">link</a>}.</p>');

            link.update('http://new.com');

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>update the url of a <a href="http://new.com" target="_blank">link</a>.</p>');
        });

        it('should update a set of attributes of a passed link element', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>update the URL of a {<a href="http://test.com" target="_blank">link</a>}.</p>');

            var linkEl = link.getFromSelection();
            assert.ok(linkEl);

            link.update({
                href: 'http://new.com',
                target: '_self'
            }, linkEl);

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>update the url of a <a href="http://new.com" target="_self">link</a>.</p>');
        });

        it('should update a set of attributes of a link from selection', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>update the URL of a {<a href="http://test.com" target="_blank">link</a>}.</p>');

            link.update({
                href: 'http://new.com',
                target: '_self'
            });

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>update the url of a <a href="http://new.com" target="_self">link</a>.</p>');
        });

        it('should remove a set of attributes from a passed link element', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>update the URL of a {<a href="http://test.com" rel="external" target="_blank">link</a>}.</p>');

            var linkEl = link.getFromSelection();
            assert.ok(linkEl);

            link.update({
                href: null,
                rel: null,
                target: ''
            }, linkEl);

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>update the url of a <a target="">link</a>.</p>');
        });

        it('should remove a set of attributes from a link from selection', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>update the URL of a {<a href="http://test.com" rel="external" target="_blank">link</a>}.</p>');

            link.update({
                href: null,
                rel: null,
                target: ''
            });

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>update the url of a <a target="">link</a>.</p>');
        });

        it('should add default protocol when updating a link', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>update the URL of a {<a href="http://test.com" target="_blank">link</a>}.</p>');

            var linkEl = link.getFromSelection();
            assert.ok(linkEl);

            link.update('new.com', linkEl);

            var data = bender.tools.getData(this.nativeEditor, {
                fixHtml: true,
                compatHtml: true
            });

            assert.strictEqual(data, '<p>update the url of a <a href="http://new.com" target="_blank">link</a>.</p>');
        });

        it('should position the cursor before the next word if modifySelection.advance is set to true', function() {
            if (CKEDITOR.env.ie) {
                // FIXME: the functionality works, but we were unable to make these tests working on IE.
                // Please help.
                return;
            }

            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>set a {selection} and then convert it to a link.</p>');

            link.create('http://test.com', {
                target: '_blank'
            }, {
                advance: true
            });

            var linkEl = this.nativeEditor.element.findOne('a');

            assert.ok(linkEl);

            var selection = this.nativeEditor.getSelection();
            var range = selection.getRanges()[0];
            range.optimize();

            var nextContainer = range.endContainer;

            assert.isTrue(range.startContainer.equals(nextContainer));
            assert.strictEqual(range.startOffset, 1);
            assert.isTrue(range.endContainer.equals(nextContainer));
            assert.strictEqual(range.endOffset, 1);
        });

        it('should position the cursor after the link if it is the last word and if modifySelection.advance is set to true', function() {
            if (CKEDITOR.env.ie) {
                // FIXME: the functionality works, but we were unable to make these tests working on IE.
                // Please help.
                return;
            }

            var link = new CKEDITOR.Link(this.nativeEditor);

            bender.tools.selection.setWithHtml(this.nativeEditor, '<p>set a {selection}</p>');

            link.create('http://test.com', {
                target: '_blank'
            }, {
                advance: true
            });

            var linkEl = this.nativeEditor.element.findOne('a');

            assert.ok(linkEl);

            var selection = this.nativeEditor.getSelection();
            var range = selection.getRanges()[0];
            range.optimize();

            assert.isTrue(range.startContainer.equals(range.endContainer));
            assert.strictEqual(range.startOffset, 1);
            assert.isTrue(range.endContainer.equals(range.endContainer));
            assert.strictEqual(range.endOffset, 1);
        });

        describe('when appendProtocol is false', function() {
            it('should not add default protocol when creating a link', function() {
                var link = new CKEDITOR.Link(
                    this.nativeEditor,
                    {
                        appendProtocol: false
                    }
                );

                bender.tools.selection.setWithHtml(this.nativeEditor, '<p>create the URL of a {selection}.</p>');

                link.create('new.com', {});

                var data = bender.tools.getData(this.nativeEditor, {
                    fixHtml: true,
                    compatHtml: true
                });

                assert.strictEqual(data, '<p>create the url of a <a href="new.com">selection</a>.</p>');
            });

            it('should not add default protocol when updating a link with string parameter', function() {
                var link = new CKEDITOR.Link(
                    this.nativeEditor,
                    {
                        appendProtocol: false
                    }
                );

                bender.tools.selection.setWithHtml(this.nativeEditor, '<p>update the URL of a {<a href="http://test.com" target="_blank">link</a>}.</p>');

                var linkEl = link.getFromSelection();
                assert.ok(linkEl);

                link.update('new.com', linkEl);

                var data = bender.tools.getData(this.nativeEditor, {
                    fixHtml: true,
                    compatHtml: true
                });

                assert.strictEqual(data, '<p>update the url of a <a href="new.com" target="_blank">link</a>.</p>');
            });

            it('should not use the default protocol when editing an existing link with object parameter', function() {
                var link = new CKEDITOR.Link(
                    this.nativeEditor,
                    {
                        appendProtocol: false
                    }
                );

                bender.tools.selection.setWithHtml(this.nativeEditor, '<p>update the url of a {<a href="http://test.com" target="_blank">link</a>}.</p>');

                var linkEl = link.getFromSelection();

                link.update({
                    href: 'test.com'
                }, linkEl);

                var data = bender.tools.getData(this.nativeEditor, {
                    fixHtml: true,
                    compatHtml: true
                });

                assert.strictEqual(data, '<p>update the url of a <a href="test.com" target="_blank">link</a>.</p>');
            });
        });
    });
}());