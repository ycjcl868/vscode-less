import {
  WorkspaceFolder,
  workspace,
  // Disposable,
  // FileSystemWatcher,
} from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as AJV from 'ajv';
import parserSheet from './utils/parserSheet';
import schema from './schema';
// import { TipType } from './types';

export default class LoadTheme {
  // private watcher: FileSystemWatcher;
  // private cache: Map<Uri, string> = new Map();
  private themePath: string = '';
  private rootPath: string = '';
  constructor() {
    // super(() => {
    //   this.watcher.dispose();
    //   this.cache.clear();
    // });
    const [ rootPath = '' ] = workspace.workspaceFolders || [];
    if (rootPath) {
      const { uri: { fsPath } } = rootPath as WorkspaceFolder;
      this.rootPath = fsPath;
      this.themePath = path.join(this.rootPath, '.themerc.js');
    }
    // this.watcher = workspace.createFileSystemWatcher("**/.themerc.js", true);
    // this.watcher.onDidChange(async uri => {
    //   if (this.cache.has(uri)) {
    //     const content = await this.loadFile(uri);
    //     this.cache.set(uri, content);
    //   }
    // });
  }
  // private async parseTheme() {

  // }
  public async parserTheme(config: any) {
    const paletteLess = fs.readFileSync(path.join(this.rootPath, 'node_modules' ,config.theme), 'utf8');
    const palette = parserSheet(paletteLess);
    console.log('----palette-', palette);
    return palette;
  }
  public async getThemeConfig() {
    if (!fs.statSync(this.rootPath)) {
      return null;
    }

    try {
      const themeConfig = require(this.themePath);
      console.log('---themeConfig---', themeConfig);
      const ajv = new AJV({ allErrors: true });
      const isValid = ajv.validate(schema, themeConfig);
      console.log('---isValid---', isValid);
      if (!isValid) {
        const errors = Array.isArray(ajv.errors)
          ? ajv.errors.map(({ dataPath, message }, index) => {
              return `${index + 1}. ${dataPath}${dataPath ? ' ' : ''}${message}`;
            })
          : [];
        throw new Error(`
          ${errors.join('\n')}
        `.trim());
      }
      console.log('----real theme---', themeConfig);
      const theme = this.parserTheme(themeConfig);
      return theme;
    } catch(e) {
      return null;
    }
  }
}
