import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { ElapsedTime } from '@components/ElapsedTime';
import { WavesurferProps, useWavesurfer } from '@wavesurfer/react';
import { PauseIcon, PlayIcon } from '@assets/icons/24/solid';
import { Box, Icon, Stack, StackProps } from 'reactjs-ui-core';
import { IconButton } from '@components/IconButton';

export interface AudioPlayerProps extends WavesurferProps {
  sx?: StackProps['sx'];
  errorMessage?: string;
  onTimeChange?: (args: { seconds: number }) => void;
}

export type AudioPlayerHandle = {
  playFromTimestamp: (ms: number) => void;
};

export const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(
  ({ url, sx, height = 100, onTimeChange, ...rest }, ref) => {
    const [state, setState] = useState({ played: false });
    const containerRef = useRef<HTMLDivElement>(null);

    const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
      container: containerRef,
      url,
      waveColor: 'rgb(92, 94, 122)',
      progressColor: 'rgba(181, 197, 228, 1)',
      height,
      dragToSeek: true,
      barHeight: 1,
      ...rest,
    });

    const playPause = () => {
      wavesurfer && wavesurfer.playPause();
      setState({ ...state, played: true });
    };

    const playFromTimestamp = (ms: number) => {
      if (wavesurfer) {
        wavesurfer.seekTo(ms / 1000 / wavesurfer.getDuration());
        wavesurfer.play();
      }
    };

    const durationMs = (wavesurfer?.getDuration() || 0) * 1000;
    const endTime = state.played ? currentTime * 1000 : durationMs;
    const currentTimeFloor = Math.floor(currentTime);

    useImperativeHandle(ref, () => ({ playFromTimestamp }));

    useEffect(() => {
      onTimeChange?.({ seconds: currentTimeFloor });
    }, [currentTimeFloor]);

    return (
      <Stack
        borderRadius={2}
        border={1}
        borderColor="primary.dark"
        sx={sx}
        pl={1}
        pr={1.2}
        spacing={1}
        width="100%"
        alignItems="center"
      >
        <Stack width="100%" alignItems="center" direction="row" spacing={1.2}>
          <IconButton
            aria-label={'Play'}
            onClick={playPause}
            sx={{
              width: 40,
              height: 40,
              transition: 'opacity 0.2s ease-in',
            }}
          >
            <Icon size={32} render={isPlaying ? PauseIcon : PlayIcon} />
          </IconButton>
          <div style={{ width: '100%' }} ref={containerRef} />
        </Stack>
        <Box display="flex" width="100%" justifyContent="space-between">
          <ElapsedTime
            color="text.secondary"
            variant="h6"
            showAlwaysHours={false}
            endTime={endTime}
          />
          <ElapsedTime
            color="text.secondary"
            variant="h6"
            showAlwaysHours={false}
            endTime={durationMs}
          />
        </Box>
      </Stack>
    );
  }
);
