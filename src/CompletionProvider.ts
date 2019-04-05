import * as vscode from 'vscode';
import { TipType } from './types';

export default class CompletionProvider implements vscode.CompletionItemProvider {
  public themeConfig: vscode.CompletionItem[] = [];
  constructor(themeConfig: Map<string, TipType> | null) {
    if (themeConfig) {
      themeConfig.forEach((theme, key) => {
        const { value, comment } = theme;
        this.themeConfig.push({
          label: `@${key} - ${value}`,
          kind: 1,
          documentation: comment,
          insertText: new vscode.SnippetString(`@${key};`)
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
    return this.themeConfig;
  }
  resolveCompletionItem(item: vscode.CompletionItem, token: vscode.CancellationToken) {
    return item;
  }
}
