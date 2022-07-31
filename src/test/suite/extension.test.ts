import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

import { compareHostnames } from '../../sort-hosts';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	const knownValues = [
		[
			['b.a', 'b.b', 'a.a', '.a', 'a.', 'a.b',],
			['a.', '.a', 'a.a', 'b.a', 'a.b', 'b.b',]
		],
	];

	test('Known values', () => {
		for (let pair of knownValues) {
			const input = pair[0]!;
			const correctAnswer = pair[1];
			assert.deepStrictEqual(input.sort(compareHostnames), correctAnswer);
		}
	});

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
