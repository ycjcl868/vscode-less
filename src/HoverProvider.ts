import * as vscode from 'vscode';
import renderTip from './utils/renderTip';
import { themeMappingTypes } from './types';

export default class implements vscode.HoverProvider {
  public themeConfig: any;
  constructor(themeConfig: any) {
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
			const tip: any = this.themeConfig[token];
			if (tip) {
				return new vscode.Hover(renderTip(tip));
			}
		}
		return null;
	}
}
