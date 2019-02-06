const assert = chai.assert;

describe('Debounce', function() {
	it('should debounce function execution', function(done) {
		const listener = sinon.stub();
		const fn = CKEDITOR.tools.debounce(listener, 0);

		fn();
		fn();
		fn();

		setTimeout(function() {
			assert.ok(listener.calledOnce);

			done();
		}, 0);
	});

	it('should call debounced function with additional alguments', function(done) {
		const listener = sinon.stub();
		const fn = CKEDITOR.tools.debounce(listener, 0);

		fn('param1');

		setTimeout(function() {
			assert.ok(listener.calledWith('param1'));
			done();
		}, 0);
	});

	it('should debounce function execution with context and params', function(done) {
		const ctx = {};
		const listener = sinon.stub();
		const args = ['param1', 'param2'];
		const fn = CKEDITOR.tools.debounce(listener, 0, ctx, args);

		fn();
		fn();
		fn();

		setTimeout(function() {
			assert.ok(listener.calledOnce);
			assert.ok(listener.calledOn(ctx));
			assert.ok(listener.calledWith('param1', 'param2'));

			done();
		}, 0);
	});

	it('should detach a debounced function execution', function(done) {
		const listener = sinon.stub();
		const fn = CKEDITOR.tools.debounce(listener, 100);

		fn();

		fn.detach();

		setTimeout(function() {
			assert.notOk(listener.calledOnce);

			done();
		}, 0);
	});

	xit('should debounce function execution for the specified delay', function(done) {
		const listener = sinon.stub();
		const fn = CKEDITOR.tools.debounce(listener, 20);

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
