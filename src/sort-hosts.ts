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
        return sortLines(editor, wholeRange);
    }
    const range = extendRangeToFullLines(selection);
    if (selection.isSingleLine) {
        return;
    }

    return sortLines(editor, range);
}


function extendRangeToFullLines(range: vscode.Range) {
    const extendedRange = new vscode.Range(
        range.start.line, 0, range.end.line + 1, 0);
    return extendedRange;
}


function sortLines(editor: vscode.TextEditor, range: vscode.Range) {
    const lines = loadWords(editor, range);
    lines.sort(compareHostnames);
    dumpLines(editor, range, lines);
}


export function compareHostnames(a: string, b: string) {
    if (reverseDomainLabels(a) < reverseDomainLabels(b)) { return -1; }
    if (reverseDomainLabels(a) > reverseDomainLabels(b)) { return 1; }
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
