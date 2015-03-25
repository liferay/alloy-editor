'use strict';

var assert = chai.assert;

describe('debounce', function() {
    this.timeout(35000);

    describe('Debounce', function() {
        it('should debounce function execution', function() {
            var listener = sinon.stub();
            var fn = CKEDITOR.tools.debounce(listener, 0);

            fn();
            fn();
            fn();

            setTimeout(function() {
                assert.ok(listener.calledOnce);
            }, 0);
        });

        it('should debounce function execution with context and params', function() {
            var ctx = {};
            var listener = sinon.stub();
            var args = ['param1', 'param2'];
            var fn = CKEDITOR.tools.debounce(listener, 0, ctx, args);

            fn();
            fn();
            fn();

            setTimeout(function() {
                assert.ok(listener.calledOnce);
                assert.ok(listener.calledOn(ctx));
                assert.ok(listener.calledWith('param1', 'param2'));
            }, 0);
        });

        it('should detach a debounced function execution', function() {
            var listener = sinon.stub();
            var fn = CKEDITOR.tools.debounce(listener, 100);

            fn();

            fn.detach();

            setTimeout(function() {
                assert.notOk(listener.calledOnce);
            }, 0);
        });

        it('should debounce function execution for the specified delay', function(done) {
            var listener = sinon.stub();
            var fn = CKEDITOR.tools.debounce(listener, 20);

            fn();

            setTimeout(function() {
                fn();
            }, 10);

            setTimeout(function() {
                fn();
            }, 10);

            setTimeout(function() {
                assert.ok(listener.calledOnce);

                done();
            }, 40);
        });
    });
});