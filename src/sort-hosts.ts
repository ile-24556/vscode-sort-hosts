import * as vscode from 'vscode';


export function sortSelectedLines() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const selection = editor.selection;

    if (selection.isEmpty) {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(editor.document.lineCount, 0);
        const wholeRange = new vscode.Range(start, end);
        return sortWords(editor, wholeRange);
    }
    const range = extendRangeToFullLines(selection);
    if (selection.isSingleLine) {
        return;
    }

    return sortWords(editor, range);
}


function extendRangeToFullLines(range: vscode.Range) {
    const extendedRange = new vscode.Range(
        range.start.line, 0, range.end.line + 1, 0);
    return extendedRange;
}


function sortWords(editor: vscode.TextEditor, range: vscode.Range) {
    const words = loadWords(editor, range);
    const outWords = sort(words);
    dumpLines(editor, range, outWords);
}

export function sort(words: string[]) {
    const hosts: Host[] = [];
    for (const word of words) {
        hosts.push(new Host(word));
    }
    hosts.sort(compareHostnames);
    const outWords: string[] = [];
    for (const host of hosts) {
        outWords.push(host.name);
    }
    return outWords;
}


function compareHostnames(a: Host, b: Host) {
    if (a.sortKey < b.sortKey) { return -1; }
    if (a.sortKey > b.sortKey) { return 1; }
    return 0;
}


class Host {
    public type: string;
    public sortKey: string[];
    constructor(public name: string) {
        this.type = 'hostname';
        this.sortKey = reverseDomainLabels(name);
    }
};


function reverseDomainLabels(hostname: string) {
    return hostname.split('.').reverse();
}


export function isValidIpv4Address(ipv4Address: string) {
    const period = '.';
    const octets = ipv4Address.split(period);
    for (const octet of octets) {
        if (!isValidIpv4Octet(octet)) {
            return false;
        }
    }
    return true;
}


function isValidIpv4Octet(octet: string) {
    // Not starts with 0
    const validOctetPattern = /^(0|[1-9]\d{0,2}$)/;
    if (!validOctetPattern.test(octet)) {
        return false;
    }
    const num = parseInt(octet);
    if (num > 255) {
        return false;
    }
    return true;
}


export function isValidHostname(hostname: string) {
    if (hostname.length > 255) {
        return false;
    }
    const period = '.';
    const labels = hostname.split(period);
    for (const label of labels) {
        if (!isValidHostnameLabel(label)) {
            return false;
        }
    }
    return true;
}


function isValidHostnameLabel(label: string) {
    if (label.length < 1 || label.length > 63) {
        return false;
    }
    const validLabelPattern = /^([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])$/;
    return validLabelPattern.test(label);
}


function loadWords(editor: vscode.TextEditor, range: vscode.Range) {
    const text = editor.document.getText(range);
    const splitters = /[,;\s]/;
    const lines = text.split(splitters);
    const nonemptyLines = lines.filter(word => word);
    return nonemptyLines;
}


function dumpLines(editor: vscode.TextEditor, range: vscode.Range, lines: string[]) {
    const newline = '\n';
    const text = lines.join(newline) + newline;
    editor.edit(editBuilder => editBuilder.replace(range, text));
}
