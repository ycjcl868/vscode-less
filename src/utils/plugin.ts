import * as postcss from 'postcss';

export const resolveModule = postcss.plugin('postcss-resolve-module', () => {
  return (css) => {
    css.walkAtRules('import', function (rule) {
      // replace ~ first
      if (rule.params.indexOf('~') === 1) {
        rule.params = rule.params.replace(/[~]+/, '');
        (rule as any).filename = (rule as any).filename.replace(/[~]+/, '');
      }
    });
  };
});
