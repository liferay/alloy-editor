/**
 * Monkey-patch the result-reporting function defined in:
 *
 * node_modules/karma/static/debug.js
 *
 * The upstream code wraps the logging for each result item in a
 * separate call to `setTimeout`. The comment suggests that the intent is to
 * preserve stack traces, but it ends up making thrown errors and other log
 * output appear far from the place where the test result is reported,
 * making the log almost indecipherable.
 *
 * This nasty monkey-patch replaces all that with equivalent code that does
 * the same without any `setTimeout` calls. Note the `toString()` check here
 * ensures that we only apply inside debug runs in the browser (`yarn
 * test:debug`) and not in command-line runs (`yarn test`).
 */
if (
	window.__karma__ &&
	window.__karma__.result &&
	window.__karma__.result.toString().match(/setTimeout/)
) {
	window.__karma__.result = function(result) {
		if (result.skipped) {
			this.skipped++;
			return;
		}
		const msg = result.success ? 'SUCCESS ' : 'FAILED ';
		console.log(msg + result.suite.join(' ') + ' ' + result.description);

		for (let i = 0; i < result.log.length; i++) {
			console.error(result.log[i]);
		}
	};
}
