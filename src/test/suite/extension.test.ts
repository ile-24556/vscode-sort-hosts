import * as assert from 'assert';
import * as vscode from 'vscode';
import { sort } from '../../sort-hosts';


suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    const knownCases = [
        [
            ['b.a', 'b.b', 'a.a', '.a', 'a.', 'a.b',],
            ['a.', '.a', 'a.a', 'b.a', 'a.b', 'b.b',]
        ],
        [
            ['almond.eg.com', 'eg.com', 'accounts.eg.com', '.eg.com',],
            ['eg.com', '.eg.com', 'accounts.eg.com', 'almond.eg.com',]
        ],
    ];

    test('Known values', () => {
        for (let pair of knownCases) {
            const input = pair[0]!;
            const correctAnswer = pair[1];
            assert.deepStrictEqual(sort(input), correctAnswer);
        }
    });
});
