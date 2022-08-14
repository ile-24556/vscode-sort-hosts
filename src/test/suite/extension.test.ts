import * as assert from 'assert';
import * as vscode from 'vscode';
import { sort, isValidHostname } from '../../sort-hosts';


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

    test('Assert sort results', () => {
        for (let pair of knownCases) {
            const input = pair[0]!;
            const correctAnswer = pair[1];
            assert.deepStrictEqual(sort(input), correctAnswer);
        }
    });

    const validHostnames = [
        'www.example.com',
        'a.b.c',
        'aa.bb.cc',
        'a--122.com',
        '1-1.1',
        '192.168.1.1',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.b',
        'aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.com'
    ];

    test('Assert valid hostnames', () => {
        for (const validHostname of validHostnames) {
            assert(isValidHostname(validHostname));
        }
    });

    const invalidHostnames = [
        '.com',
        'www.',
        '-a.com',
        'a-.com',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.b',
        'bbb.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.com'
    ];

    test('Known invalid hostnames', () => {
        for (const invalidHostname of invalidHostnames) {
            assert(!isValidHostname(invalidHostname));
        }
    });
});
