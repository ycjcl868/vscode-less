import * as vscode from 'vscode';
import { TipType } from './types';
import renderTip from './utils/renderTip';

export default class implements vscode.HoverProvider {
  public themeConfig: Map<string, TipType> | null;
  constructor(themeConfig: Map<string, TipType> | null) {
    this.themeConfig = themeConfig;
    console.log('----this.themeConfig--', this.themeConfig);
  }
  getTip = (token: string, prefix?: string) => {
    if (!this.themeConfig) {
      return null;
    }
    const themeIterator = this.themeConfig.entries();
    const firstLetter = prefix || '';
    for (let theme of themeIterator) {
      const [key, config] = theme;
      // console.log('-----key-', key, prefix, config.value, `${firstLetter}${token}`);
      // key => value
      if (key === token) {
        return config;
      }
      // value => key
      if (config.value === `${firstLetter}${token}`) {
        return {
          value: `@${key}`,
          comment: config.comment,
        };
      }
    }
  }
	async provideHover(
		doc: vscode.TextDocument,
		pos: vscode.Position,
	) {
		const range = doc.getWordRangeAtPosition(pos, /(#|@)?[\w-]+/);
		if (range) {
      const prefixRange = range.start.translate(0, 1);
      const prefix = doc.getText(new vscode.Range(prefixRange, range.start));
			const token = doc.getText(new vscode.Range(prefixRange, range.end));
			const tip = this.getTip(token, prefix);
			if (tip) {
				return new vscode.Hover(renderTip(tip));
			}
		}
		return null;
	}
}
