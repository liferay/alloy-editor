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

        it('should not add default protocol when updating a link', function() {
            var link = new CKEDITOR.Link(this.nativeEditor);

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
    });
}());