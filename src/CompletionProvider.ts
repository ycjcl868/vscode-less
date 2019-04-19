import * as vscode from 'vscode';
import { TipType, IType } from './types';

export default class CompletionProvider implements vscode.CompletionItemProvider {
  public type: IType | null;
  public themeConfig: vscode.CompletionItem[] = [];
  constructor(
    themeConfig: Map<string, TipType> | null,
    type: IType | null = 'less',
  ) {
    if (themeConfig) {
      themeConfig.forEach((theme, key) => {
        const { value, comment } = theme;
        this.themeConfig.push({
          label: `@${key} - ${value}`,
          kind: 1,
          documentation: comment,
          insertText: new vscode.SnippetString(`@${key}`)
        });
      });
      console.log('----this.themeConfig-', this.themeConfig);
    }
    this.type = type;
  }

  provideCompletionItems(
    doc: vscode.TextDocument,
    pos: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext,
  ) {
    if (doc.languageId !== this.type) {
      return [] as any;
    }

    // TODO last char ; detect
    // const lastChar = doc.getWordRangeAtPosition(pos.translate(0, -1));
    // console.log('---lastChar-', doc.getText(lastChar));


    return this.themeConfig;
  }
  resolveCompletionItem(item: vscode.CompletionItem, token: vscode.CancellationToken) {
    return item;
  }
}
