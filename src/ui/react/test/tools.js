(function() {
    'use strict';

    var assert = chai.assert;

    describe('Tools', function() {
        this.timeout(35000);

        it('should merge objects and ignore inherited properties', function() {
            var obj1 = {
                prop1: 'prop1'
            };

            Object.prototype.test123 = 'test123';

            var obj2 = {};

            var obj3 = CKEDITOR.tools.merge(obj1, obj2);

            delete Object.prototype.test123;

            assert.strictEqual('prop1', obj3.prop1);
            assert.isUndefined(obj3.test123);
        });

        it('should simulate events on DOM elements', function() {
            var el = document.createElement('div');
            el.onclick = sinon.spy();

            document.body.appendChild(el);

            CKEDITOR.tools.simulate(el, 'click');

            el.parentNode.removeChild(el);

            assert.ok(el.onclick.calledOnce);
        });
    });
}());