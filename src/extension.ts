import * as vscode from 'vscode';
import * as sortHosts from './sort-hosts';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "sort-hosts" is now active!');
    let command = vscode.commands.registerCommand('sort-hosts.sort', sortHosts.sortHosts);
    context.subscriptions.push(command);
}
