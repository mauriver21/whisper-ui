import React, { useState } from 'react';
import { AudioPlayer } from '@components/AudioPlayer';
import { Body1, Box } from 'reactjs-ui-core';

export interface InputAudioProps {
  height?: number;
}

export const InputAudio: React.FC<InputAudioProps> = ({ height = 100 }) => {
  const [audioPath, setAudioPath] = useState('');

  const selectAudioPath = async () => {
    const {
      filePaths: [filePath],
      canceled,
    } = await window.api.showOpenDialog({ title: 'Select audio' });
    if (canceled === false) setAudioPath(filePath);
  };

  return (
    <Box position="relative" height={height}>
      {audioPath ? (
        <AudioPlayer url={`file://${audioPath}`} height={height} />
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
