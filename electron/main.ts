import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'node:url';
import { ElectronApi } from './types/ElectronApi';
import path from 'node:path';
import {
  exec,
  getAppPath,
  pathJoin,
  fileExists,
  readDirectory,
  dirExists,
  readBinaryFile,
  createDirectory,
  readFileAsString,
  writeBinaryFile,
  showOpenDialog,
  watchDirs,
  unwatchDirs,
  spawn,
  writeFile,
} from './commands';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, '..');

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let win: BrowserWindow | null;

ipcMain.handle(ElectronApi.GetAppPath, getAppPath);
ipcMain.handle(ElectronApi.ExecCommand, exec);
ipcMain.handle(ElectronApi.PathJoin, pathJoin);
ipcMain.handle(ElectronApi.SpawnProcess, spawn);
ipcMain.handle(ElectronApi.FileExists, fileExists);
ipcMain.handle(ElectronApi.WriteFile, writeFile);
ipcMain.handle(ElectronApi.ReadDirectory, readDirectory);
ipcMain.handle(ElectronApi.DirExists, dirExists);
ipcMain.handle(ElectronApi.ReadBinaryFile, readBinaryFile);
ipcMain.handle(ElectronApi.CreateDirectory, createDirectory);
ipcMain.handle(ElectronApi.ReadFileAsString, readFileAsString);
ipcMain.handle(ElectronApi.WriteBinaryFile, writeBinaryFile);
ipcMain.handle(ElectronApi.ShowOpenDialog, showOpenDialog);
ipcMain.handle(ElectronApi.WatchDirs, watchDirs);
ipcMain.handle(ElectronApi.UnwatchDirs, unwatchDirs);

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      devTools: true,
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
    },
  });

  win.webContents.openDevTools();
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
