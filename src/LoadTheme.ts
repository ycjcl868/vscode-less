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
import { IConfig } from './types';

export default class LoadTheme {
  // private watcher: FileSystemWatcher;
  // private cache: Map<Uri, string> = new Map();
  private themePath: string = '';
  private themeConfigPath: string = '';
  private typeConfig: string = '';
  private rootPath: string = '';
  constructor() {
    const [ rootPath = '' ] = workspace.workspaceFolders || [];
    if (rootPath) {
      const { uri: { fsPath } } = rootPath as WorkspaceFolder;
      this.rootPath = fsPath;
      this.themePath = path.join(this.rootPath, '.themerc.js');
    }
  }

  public get themeUserPath(): string {
    return path.join(this.themeConfigPath);
  }

  public get typeUserConfig(): string {
    return this.typeConfig;
  }


  private getThemePath = (configTheme: string) => {
    const themePath = path.join(
      this.rootPath,
        (
          configTheme.match(/^\./)
          ? ''
          : 'node_modules'
        ),
      configTheme,
    );
    if (fs.existsSync(themePath)) {
      return themePath;
    }
    throw new Error(`theme file don't exists`);
  }
  public async parserTheme(config: IConfig) {
    const themePath = this.getThemePath(config.theme);
    const paletteLess = fs.readFileSync(themePath, 'utf8');
    const palette = await parserSheet(paletteLess, themePath);
    console.log('----palette-', palette);
    return palette;
  }
  private validateConfig(validateSchema: object, config: IConfig) {
    const ajv = new AJV({ allErrors: true });
    const isValid = ajv.validate(validateSchema, config);
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
  }
  public async getThemeConfig() {
    if (!fs.statSync(this.rootPath)) {
      return null;
    }
    const themeConfig = require(this.themePath);
    console.log('---themeConfig---', themeConfig);
    this.validateConfig(schema, themeConfig);
    this.typeConfig = themeConfig.type;
    this.themeConfigPath = themeConfig.theme;
    console.log('----real theme---', themeConfig);
    const theme = await this.parserTheme(themeConfig);
    return theme;
  }
}
