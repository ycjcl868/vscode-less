'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import HoverProvider from './HoverProvider';
import CompletionProvider from './CompletionProvider';
import LoadTheme from './LoadTheme';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-less" is now active!');
  const loadTheme = new LoadTheme();
  const theme = await loadTheme.getThemeConfig();
  context.subscriptions.push(
      vscode.languages.registerHoverProvider({
        scheme: 'file',
        language: 'less',
      }, new HoverProvider(theme)),
      vscode.languages.registerCompletionItemProvider({
        scheme: 'file',
        language: 'less',
      }, new CompletionProvider(theme), '@'),
  );
}

// this method is called when your extension is deactivated
export function deactivate() {
}
