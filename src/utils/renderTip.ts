
import { MarkdownString } from 'vscode';
import { TipType } from '../types';

export default (tip: TipType): MarkdownString => {
  let markdown = '';
  markdown += '\n';
  markdown += `\n* value: ${tip.value}`;
  if (tip.comment) {
    markdown += `\n* comment: ${tip.comment}`;
  }
  return new MarkdownString(markdown);
}
