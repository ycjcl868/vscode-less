import * as vscode from 'vscode';
import { TipType } from './types';
import renderTip from './utils/renderTip';

export default class implements vscode.HoverProvider {
  public themeConfig: any;
  constructor(themeConfig: Map<string, TipType> | null) {
    this.themeConfig = themeConfig;
    console.log('----this.themeConfig--', this.themeConfig);
  }
	async provideHover(
		doc: vscode.TextDocument,
		pos: vscode.Position,
	) {
		const range = doc.getWordRangeAtPosition(pos, /@[\w-]+/);
		if (range) {
			const token = doc.getText(new vscode.Range(range.start.translate(0, 1), range.end));
			console.log('--token--', token);
			const tip = this.themeConfig.get(token);
			if (tip) {
				return new vscode.Hover(renderTip(tip));
			}
		}
		return null;
	}
}
