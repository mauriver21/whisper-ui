import { ElapsedTime } from '@components/ElapsedTime';
import { WhisperSegment } from '@interfaces/WhisperSegment';
import React from 'react';
import { Body2, Stack } from 'reactjs-ui-core';

export interface TranscriptionSegmentProps {
  segment: WhisperSegment;
}

export const TranscriptionSegment: React.FC<TranscriptionSegmentProps> = ({
  segment,
}) => {
  return (
    <Stack
      p={1}
      sx={{
        '&:hover': {
          borderRadius: 10,
          bgcolor: (theme) => {
            return theme.palette.secondary.dark;
          },
        },
      }}
      direction="row"
      spacing={2}
    >
      <ElapsedTime
        startTime={segment.start * 1000}
        endTime={segment.end * 1000}
        showAlwaysHours={false}
      />
      <Body2>{segment.text}</Body2>
    </Stack>
  );
};
