const assert = chai.assert;

describe('Debounce', () => {
	it('should debounce function execution', done => {
		const listener = sinon.stub();
		const fn = CKEDITOR.tools.debounce(listener, 0);

		fn();
		fn();
		fn();

		setTimeout(() => {
			assert.ok(listener.calledOnce);

			done();
		}, 0);
	});

	it('should call debounced function with additional alguments', done => {
		const listener = sinon.stub();
		const fn = CKEDITOR.tools.debounce(listener, 0);

		fn('param1');

		setTimeout(() => {
			assert.ok(listener.calledWith('param1'));
			done();
		}, 0);
	});

	it('should debounce function execution with context and params', done => {
		const ctx = {};
		const listener = sinon.stub();
		const args = ['param1', 'param2'];
		const fn = CKEDITOR.tools.debounce(listener, 0, ctx, args);

		fn();
		fn();
		fn();

		setTimeout(() => {
			assert.ok(listener.calledOnce);
			assert.ok(listener.calledOn(ctx));
			assert.ok(listener.calledWith('param1', 'param2'));

			done();
		}, 0);
	});

	it('should detach a debounced function execution', done => {
		const listener = sinon.stub();
		const fn = CKEDITOR.tools.debounce(listener, 100);

		fn();

		fn.detach();

		setTimeout(() => {
			assert.notOk(listener.calledOnce);

			done();
		}, 0);
	});

	it('should debounce function execution for the specified delay', done => {
		const listener = sinon.stub();
		const fn = CKEDITOR.tools.debounce(listener, 20);

		fn();

		setTimeout(fn, 10);
		setTimeout(fn, 10);

		setTimeout(() => {
			assert.ok(listener.calledOnce);

			done();
		}, 40);
	});
});
