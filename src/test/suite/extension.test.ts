import * as assert from 'assert';
import * as vscode from 'vscode';
import { sort, isValidIpv4Address, isValidHostname } from '../../sort-hosts';


suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    const knownCases = [
        [
            ['b.a', 'b.b', 'a.a', '.a', 'a.', 'a.b',],
            ['a.a', 'b.a', 'a.b', 'b.b', '.a', 'a.',]
        ],
        [
            ['almond.eg.com', 'eg.com', 'accounts.eg.com', '.eg.com',],
            ['eg.com', 'accounts.eg.com', 'almond.eg.com', '.eg.com',]
        ],
        [
            ['10.0.0.0', '9.99.99.99', '9.100.0.0', '0.0.0.0', '255.255.255.255',],
            ['0.0.0.0', '9.99.99.99', '9.100.0.0', '10.0.0.0', '255.255.255.255',]
        ],
        [
            ['255.255.255.com', '255.255.255.255', '-a.com',],
            ['255.255.255.com', '255.255.255.255', '-a.com',]
        ],
        [
            ['a.a', 'az.a'],
            ['a.a', 'az.a']
        ],
        [
            ['a.a', 'Az.a', 'b.a'],
            ['a.a', 'Az.a', 'b.a']
        ],
        [
            ['b.a', 'a.a', 'A.a'],
            ['a.a', 'A.a', 'b.a']
        ],
        [
            ['b.a', 'A.a', 'a.a'],
            ['A.a', 'a.a', 'b.a']
        ],
    ];

    test('Sort results', () => {
        for (let pair of knownCases) {
            const input = pair[0]!;
            const correctAnswer = pair[1];
            assert.deepStrictEqual(sort(input), correctAnswer);
        }
    });

    const validIpv4Addresses = [
        '0.0.0.0',
        '9.10.99.100',
        '101.199.200.255',
        '255.255.255.255',
    ];

    test('Valid IPv4 addresses', () => {
        for (const validIpv4Address of validIpv4Addresses) {
            assert(isValidIpv4Address(validIpv4Address));
        }
    });

    const invalidIpv4Addresses = [
        '01.0.0.0',
        '192.168.0.256',
        '192.168.0.0.1',
        '192.168.1',
    ];

    test('Invalid IPv4 addresses', () => {
        for (const invalidIpv4Address of invalidIpv4Addresses) {
            assert(!isValidIpv4Address(invalidIpv4Address));
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

    test('Valid hostnames', () => {
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

    test('Invalid hostnames', () => {
        for (const invalidHostname of invalidHostnames) {
            assert(!isValidHostname(invalidHostname));
        }
    });
});
