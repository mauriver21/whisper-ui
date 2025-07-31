export const FileFilter = {
  Audios: [
    {
      extensions: ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac', 'webm'],
      name: 'images',
    },
  ],
  Images: [{ extensions: ['jpg', 'jpeg', 'png', 'icns'], name: 'images' }],
  WindowsExecutables: [
    { extensions: ['exe', 'msi', 'bat', 'cmd'], name: 'executables' },
  ],
};

export enum WhisperModel {
  Tiny = 'tiny',
  Base = 'base',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}
