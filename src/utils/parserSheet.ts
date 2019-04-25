import * as postcss from 'postcss';
import { resolveModule } from './plugin';
import { TipType } from '../types';

interface ChildNode extends postcss.AtRule {
  value: string;
  variable: boolean;
}

const translate = async (sheet: string, themePath: string): Promise<Map<string, TipType>> => {
  const lessSyntax = require('postcss-less');
  const postcssImport = require('postcss-import');

  const cssAST: postcss.Result = await postcss()
    .use(resolveModule())
    .use(postcssImport())
    .process(sheet, {
      syntax: lessSyntax,
      from: themePath,
    });
  const themeMappings: Map<string, TipType> = new Map();
  if (cssAST.root && Array.isArray(cssAST.root.nodes)) {
    cssAST.root.nodes.forEach((childNode) => {
      // console.log('---childNode-', childNode);
      const { type, name, value, variable } = childNode as ChildNode;
      const prevNode = childNode.prev();
      if (variable && type === 'atrule') {
        themeMappings.set(name, {
          value,
          comment: prevNode && prevNode.type === 'comment'
            ? prevNode.text
            : ''
        });
      }
    });
  }
  // deep resolve theme Value
  themeMappings.forEach((item, theme) => {
    const { value } = item;
    if (value && value.indexOf('@') > -1) {
      const realTheme = themeMappings.get(value.replace('@', ''));
      if (realTheme) {
        themeMappings.set(theme, realTheme);
      }
    }
  });
  return themeMappings;
};

export default translate;
