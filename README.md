# vscode-lessTheme
A [Visual Studio Code](https://code.visualstudio.com/) extension to intellisense for Less theme variables.

## Screenshots
![vscode-less-extension](https://user-images.githubusercontent.com/13595509/56843087-36e4e400-68cf-11e9-81b1-2eb71684c8b3.gif)


## Installation
install through VS Code extensions. Search for `vscode-lessTheme`.

[Visual Studio Code Market Place: vscode-lessTheme](https://marketplace.visualstudio.com/items?itemName=ycjcl868.vscode-less)

## Usage
create `.themerc.js` file in your workspace(the project root directory).

```js
module.exports = {
  // For now, it only supports `less`, other languages will soon support.
  type: 'less',
  // you could config a local filePath or use module name like `require`
  theme: './your_less_parameters_filePath.less'
};
```

restart your VSCode, enjoy your style coding with `@` triggerChar in your front-end project.

## Contribute
Feel free to open [issues](https://github.com/ycjcl868/vscode-less/issues) or [PRs](https://github.com/ycjcl868/vscode-less/pulls)!

## TODO
- [x] theme variable completion
- [x] hover `token` show `value` tips
- [x] hover `value` show `token` tips
- [x] support inline `@import` rules in the theme file.
- [ ] suggestion for all values.
- [ ] Near value detection
