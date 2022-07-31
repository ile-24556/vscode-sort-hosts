import * as vscode from 'vscode';
import { sortSelectedLines } from './sort-hosts';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "sort-hosts" is now active!');
    let command = vscode.commands.registerCommand('sort-hosts.sort', sortSelectedLines);
    context.subscriptions.push(command);
}
