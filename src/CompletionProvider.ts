import * as vscode from 'vscode';
import { TipType } from './types';

export default class CompletionProvider implements vscode.CompletionItemProvider {
  public themeConfig: vscode.CompletionItem[] = [];
  constructor(themeConfig: Map<string, TipType> | null) {
    if (themeConfig) {
      themeConfig.forEach((theme, key) => {
        const { value, comment } = theme;
        this.themeConfig.push({
          label: key,
          kind: 1,
          documentation: comment,
          insertText: new vscode.SnippetString(key)
        });
      });
    }
  }

  provideCompletionItems(
    doc: vscode.TextDocument,
    pos: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext,
  ) {
    if (doc.languageId !== 'less') {
      return [] as any;
    }
    const char = context.triggerCharacter;
    console.log('---char--', char);
    if (char === '@' && this.themeConfig) {
      return new Promise((resolve, reject) => {
        resolve(this.themeConfig);
      });
    }
  }
  resolveCompletionItem(item: vscode.CompletionItem, token: vscode.CancellationToken): Thenable<vscode.CompletionItem> {
    return new Promise((resolve, reject) => {
      resolve(item);
    });
  }
}
