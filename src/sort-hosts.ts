import * as vscode from 'vscode';


function sortSelectedLines() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return undefined;
    }

    const selection = editor.selection;

    if (selection.isEmpty) {
        const startLine = 0;
        const endLine = editor.document.lineCount - 1;
        sortLines(editor, startLine, endLine);
    }

    if (selection.isSingleLine) {
        return undefined;
    }

    return sortLines(editor, selection.start.line, selection.end.line);
}


function sortLines(editor: vscode.TextEditor, startLine: number, endLine: number) {
    const lines = loadWords(editor, startLine, endLine);
    lines.sort(compareHostnames);

    const newline = '\n';
    const sortedText = lines.join(newline) + newline;

    const replaceRange = new vscode.Range(startLine, 0, endLine + 1, 0);
    editor.edit(editBuilder => editBuilder.replace(replaceRange, sortedText));
}


function loadWords(editor: vscode.TextEditor, startLine: number, endLine: number) {
    const range = new vscode.Range(startLine, 0, endLine + 1, 0);
    const text = editor.document.getText(range);
    const splitters = /[,;\s\r\n]/;
    const lines = text.split(splitters);
    const contentLines = lines.filter(word => word);
    return contentLines;
}


function compareHostnames(a: string, b: string) {
    if (reverseDomainLabels(a) < reverseDomainLabels(b)) { return -1; }
    if (reverseDomainLabels(a) > reverseDomainLabels(b)) { return 1; }
    return 0;
}


function reverseDomainLabels(hostname: string) {
    return hostname.split('.').reverse();
}


export const sortHosts = () => sortSelectedLines();
