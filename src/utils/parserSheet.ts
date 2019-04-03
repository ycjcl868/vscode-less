import * as postcss from 'postcss';
import { themeMappingTypes } from '../types';

interface ChildNode extends postcss.AtRule {
  value: string;
  variable: boolean;
}

const translate = async (sheet: string): Promise<themeMappingTypes> => {
  const lessSyntax = require('postcss-less');
  const cssAST: postcss.Result = await postcss().process(sheet, {
    syntax: lessSyntax,
  });
  const themeMappings: themeMappingTypes = {};
  if (cssAST.root && Array.isArray(cssAST.root.nodes)) {
    cssAST.root.nodes.forEach((childNode) => {
      const { type, name, value, variable } = childNode as ChildNode;
      const prevNode = childNode.prev();
      if (variable && type === 'atrule') {
        themeMappings[name] = {
          value,
          comment: prevNode && prevNode.type === 'comment'
            ? prevNode.text
            : ''
        };
      }
    });
  }
  Object.keys(themeMappings).forEach(theme => {
    const { value } = themeMappings[theme];
    if (value && value.indexOf('@') > -1) {
      themeMappings[theme] = themeMappings[value.replace('@', '')];
    }
  });
  return themeMappings;
};

export default translate;
