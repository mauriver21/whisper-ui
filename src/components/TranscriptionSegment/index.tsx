import { ElapsedTime } from '@components/ElapsedTime';
import { WhisperSegment } from '@interfaces/WhisperSegment';
import React, { useMemo } from 'react';
import { Body2, Stack } from 'reactjs-ui-core';

export interface TranscriptionSegmentProps {
  segment: WhisperSegment;
  onClick?: (args: { timestamp: number }) => void;
}

export const TranscriptionSegment: React.FC<TranscriptionSegmentProps> = ({
  segment,
  onClick,
}) => {
  const endTime = useMemo(() => segment.start * 1000, []);

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
      onClick={() => onClick?.({ timestamp: endTime })}
    >
      <ElapsedTime
        sx={{ minWidth: 80 }}
        startTime={0}
        endTime={endTime}
        showAlwaysHours={false}
      />
      <Body2>{segment.text}</Body2>
    </Stack>
  );
};
