import { ipcRenderer, contextBridge } from 'electron';
import { RendererApi } from './types/RendererApi';
import { ElectronApi } from './types/ElectronApi';
import { WatchDirEvent } from './types/WatchDirEvent';
import { v4 as uuid } from 'uuid';

const listeners: Record<
  string,
  (event: Electron.IpcRendererEvent, ...args: any[]) => void
> = {};

// Custom APIs for renderer
const api: RendererApi = {
  getAppPath: () => ipcRenderer.invoke(ElectronApi.GetAppPath),
  execCommand: (...args) =>
    ipcRenderer.invoke(ElectronApi.ExecCommand, ...args),
  pathJoin: (...args) => ipcRenderer.invoke(ElectronApi.PathJoin, ...args),
  spawnProcess: (...args) =>
    ipcRenderer.invoke(ElectronApi.SpawnProcess, ...args),
  onStdOut: (callback: (data: string) => void) => {
    const listener = (_: Electron.IpcRendererEvent, data: string) =>
      callback(data);
    ipcRenderer.on(ElectronApi.SpawnStdout, listener);
    const cleanupOnExit = (_: Electron.IpcRendererEvent, _exitCode: number) => {
      ipcRenderer.removeListener(ElectronApi.SpawnStdout, listener);
      ipcRenderer.removeListener(ElectronApi.SpawnExit, cleanupOnExit);
    };
    ipcRenderer.on(ElectronApi.SpawnExit, cleanupOnExit);
  },
  onStdErr: (callback: (data: string) => void) => {
    const listener = (_: Electron.IpcRendererEvent, data: string) =>
      callback(data);
    ipcRenderer.on(ElectronApi.SpawnStderr, listener);
    const cleanupOnExit = (_: Electron.IpcRendererEvent, _exitCode: number) => {
      ipcRenderer.removeListener(ElectronApi.SpawnStderr, listener);
      ipcRenderer.removeListener(ElectronApi.SpawnExit, cleanupOnExit);
    };
    ipcRenderer.on(ElectronApi.SpawnExit, cleanupOnExit);
  },
  onExit: (callback: (code: number) => void) => {
    const listener = (_: Electron.IpcRendererEvent, code: number) =>
      callback(code);
    ipcRenderer.on(ElectronApi.SpawnExit, listener);
    const cleanupOnExit = (_: Electron.IpcRendererEvent, _exitCode: number) => {
      ipcRenderer.removeListener(ElectronApi.SpawnExit, listener);
      ipcRenderer.removeListener(ElectronApi.SpawnExit, cleanupOnExit);
    };
    ipcRenderer.on(ElectronApi.SpawnExit, cleanupOnExit);
  },
  subscribeToWatchDirs: (callback: (event: WatchDirEvent) => void) => {
    const id = uuid();
    listeners[id] = (_: Electron.IpcRendererEvent, event: WatchDirEvent) =>
      callback({ ...event, listenerId: id });
    ipcRenderer.on(ElectronApi.SubscribeWatchDirs, listeners[id]);
  },
  unsubscribeFromWatchDirs: (listenerId: string) => {
    listeners[listenerId] &&
      ipcRenderer.removeListener(
        ElectronApi.SubscribeWatchDirs,
        listeners[listenerId]
      );
  },
  fileExists: (...args) => ipcRenderer.invoke(ElectronApi.FileExists, ...args),
  writeFile: (...args) => ipcRenderer.invoke(ElectronApi.WriteFile, ...args),
  readDirectory: (...args) =>
    ipcRenderer.invoke(ElectronApi.ReadDirectory, ...args),
  dirExists: (...args) => ipcRenderer.invoke(ElectronApi.DirExists, ...args),
  readBinaryFile: (...args) =>
    ipcRenderer.invoke(ElectronApi.ReadBinaryFile, ...args),
  createDirectory: (...args) =>
    ipcRenderer.invoke(ElectronApi.CreateDirectory, ...args),
  readFileAsString: (...args) =>
    ipcRenderer.invoke(ElectronApi.ReadFileAsString, ...args),
  writeBinaryFile: (...args) =>
    ipcRenderer.invoke(ElectronApi.WriteBinaryFile, ...args),
  showOpenDialog: (...args) =>
    ipcRenderer.invoke(ElectronApi.ShowOpenDialog, ...args),
  watchDirs: (...args) => ipcRenderer.invoke(ElectronApi.WatchDirs, ...args),
  unwatchDirs: (...args) =>
    ipcRenderer.invoke(ElectronApi.UnwatchDirs, ...args),
};

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args)
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APTs you need here.
  // ...
});
contextBridge.exposeInMainWorld('api', api);
