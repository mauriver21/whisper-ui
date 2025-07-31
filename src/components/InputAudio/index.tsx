import React, { useEffect, useState } from 'react';
import { AudioPlayer } from '@components/AudioPlayer';
import { Body1, Box, Icon } from 'reactjs-ui-core';
import { FileFilter } from '@constants/enums';
import { PencilIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@components/IconButton';
import { showOpenDialog } from '@utils/showOpenDialog';

export interface InputAudioProps {
  disableAudioTools?: boolean;
  height?: number;
  onChange?: (audioPath: string) => void;
}

export const InputAudio: React.FC<InputAudioProps> = ({
  disableAudioTools,
  height = 100,
  onChange,
}) => {
  const [audioPath, setAudioPath] = useState('');

  const selectAudioPath = async () => {
    const {
      filePaths: [filePath],
      canceled,
    } = await showOpenDialog({
      title: 'Select audio',
      filters: FileFilter.Audios,
    });
    if (canceled === false) setAudioPath(filePath);
  };

  useEffect(() => {
    audioPath && onChange?.(audioPath);
  }, [audioPath]);

  return (
    <Box position="relative">
      {audioPath ? (
        <Box
          position="relative"
          sx={{
            '& .audio-tools': { display: 'none' },
            ...(disableAudioTools
              ? {}
              : { '&:hover .audio-tools': { display: 'block' } }),
          }}
        >
          <AudioPlayer url={`file://${audioPath}`} height={height} />
          <Box
            className="audio-tools"
            zIndex={2}
            position="absolute"
            top={10}
            right={10}
          >
            <IconButton onClick={selectAudioPath}>
              <Icon strokeWidth={3} color="text.primary" render={PencilIcon} />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box
          onClick={selectAudioPath}
          height={height}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={10}
          border={(theme) => `2px dashed ${theme.palette.primary.dark}`}
          maxWidth={700}
          marginX="auto"
        >
          <Body1 fontWeight={400} fontSize={24}>
            Select Audio File
          </Body1>
        </Box>
      )}
    </Box>
  );
};
