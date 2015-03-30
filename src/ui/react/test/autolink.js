'use strict';

var assert = chai.assert;

var KEY_BACK = 8;

var KEY_COMMA = 188;

var KEY_ENTER = 13;

var KEY_SEMICOLON = 186;

var KEY_SPACE = 32;

describe('Autolink', function() {
    this.timeout(35000);

    before(Utils.createAlloyEditor);

    after(Utils.destroyAlloyEditor);

    beforeEach(Utils.beforeEach);

    afterEach(Utils.afterEach);

    it('should create a link when pressing SPACE', function() {
        testLink.call(this, {
            expected: '<p>link <a href="www.liferay.com" target="_blank">www.liferay.com</a></p>',
            html: '<p>link www.liferay.com { }</p>',
            keyCode: KEY_SPACE
        });

        testLink.call(this, {
            expected: '<p>link <a href="www.liferay.com" target="_blank">www.liferay.com</a> text</p>',
            html: '<p>link www.liferay.com { }text</p>',
            keyCode: KEY_SPACE
        });
    });

    it('should create a link when pressing COMMA', function() {
        testLink.call(this, {
            expected: '<p>link <a href="www.liferay.com" target="_blank">www.liferay.com</a></p>',
            html: '<p>link www.liferay.com { }</p>',
            keyCode: KEY_COMMA
        });

        testLink.call(this, {
            expected: '<p>link <a href="www.liferay.com" target="_blank">www.liferay.com</a> text</p>',
            html: '<p>link www.liferay.com { }text</p>',
            keyCode: KEY_COMMA
        });
    });

    it('should create a link when pressing SEMICOLON', function() {
        testLink.call(this, {
            expected: '<p>link <a href="www.liferay.com" target="_blank">www.liferay.com</a></p>',
            html: '<p>link www.liferay.com { }</p>',
            keyCode: KEY_SEMICOLON
        });

        testLink.call(this, {
            expected: '<p>link <a href="www.liferay.com" target="_blank">www.liferay.com</a> text</p>',
            html: '<p>link www.liferay.com { }text</p>',
            keyCode: KEY_SEMICOLON
        });
    });

    it('should create a link when pressing ENTER', function() {
        testLink.call(this, {
            expected: '<p>link <a href="www.liferay.com" target="_blank">www.liferay.com</a></p><p>text</p>',
            html: '<p>link www.liferay.com<br/></p>{ }<p>text</p>',
            keyCode: KEY_ENTER
        });
    });

    it('should NOT create a link if last word is not a valid URL', function() {
        testLink.call(this, {
            expected: '<p>invalid link ww.liferay.com</p>',
            html: 'invalid link ww.liferay.com { }',
            keyCode: KEY_SPACE
        });

        testLink.call(this, {
            expected: '<p>invalid link ww.liferay.com</p>',
            html: 'invalid link ww.liferay.com { }',
            keyCode: KEY_COMMA
        });

        testLink.call(this, {
            expected: '<p>invalid link some_word</p>',
            html: 'invalid link some_word { }',
            keyCode: KEY_SEMICOLON
        });

        testLink.call(this, {
            expected: '<p>invalid link ww.liferay.com</p><p>text</p>',
            html: '<p>invalid link ww.liferay.com</p>{ }<p>text</p>',
            keyCode: KEY_ENTER
        });
    });

    it('should undo the created link when pressing BACKSPACE', function() {
        bender.tools.selection.setWithHtml(this.nativeEditor, 'link www.liferay.com { }');

        var editable = this.nativeEditor.editable();

        happen.keyup(editable.$, {keyCode: KEY_SPACE});

        happen.keydown(editable.$, {keyCode: KEY_BACK});

        var data = getData.call(this);

        assert.strictEqual(data, '<p>link www.liferay.com</p>');
    });

    it('should NOT remove a link that has not just been created', function() {
        testLink.call(this, {
            expected: '<p>link <a href="www.liferay.com" target="_blank">www.liferay.com</a></p>',
            html: '<p>link <a href="www.liferay.com" target="_blank">www.liferay.com</a> { }</p>',
            keyCode: KEY_BACK
        });
    });

    it('should convert only valid urls as links', function() {
        testLink.call(this, {
            expected: '<p>link <a href="www.liferay.org" target="_blank">www.liferay.org</a></p>',
            html: '<p>link www.liferay.org { }</p>',
            keyCode: KEY_SPACE
        });

        testLink.call(this, {
            expected: '<p>link <a href="http://www.liferay.com" target="_blank">http://www.liferay.com</a></p>',
            html: '<p>link http://www.liferay.com { }</p>',
            keyCode: KEY_SPACE
        });

        testLink.call(this, {
            expected: '<p>link <a href="http://liferay.com" target="_blank">http://liferay.com</a></p>',
            html: '<p>link http://liferay.com { }</p>',
            keyCode: KEY_SPACE
        });

        testLink.call(this, {
            expected: '<p>link <a href="https://www.liferay.com" target="_blank">https://www.liferay.com</a></p>',
            html: '<p>link https://www.liferay.com { }</p>',
            keyCode: KEY_SPACE
        });

        testLink.call(this, {
            expected: '<p>invalid link ww.liferay.com</p>',
            html: '<p>invalid link ww.liferay.com { }</p>',
            keyCode: KEY_SPACE
        });

        testLink.call(this, {
            expected: '<p>invalid link liferay.com</p>',
            html: '<p>invalid link liferay.com { }</p>',
            keyCode: KEY_SPACE
        });
    });

    function testLink(config) {
        bender.tools.selection.setWithHtml(this.nativeEditor, config.html);

        happen.keyup(this._editable, {keyCode: config.keyCode});

        var data = getData.call(this);

        assert.equal(data, config.expected);
    }

    function getData() {
        return bender.tools.getData(this.nativeEditor, {
            compatHtml: true,
            fixHtml: true
        });
    }
});