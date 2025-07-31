import React, { useRef, useState } from 'react';
import { Button } from '@components/Button';
import { InputAudio } from '@components/InputAudio';
import { Body1, Box, Card, CardContent, Grid, Stack } from 'reactjs-ui-core';
import { TextField } from 'reactjs-ui-form-fields';
import { WhisperResult } from '@interfaces/WhisperResult';
import { TranscriptionSegment } from '@components/TranscriptionSegment';
import { AudioPlayerHandle } from '@components/AudioPlayer';
import { useWhisperApiClient } from '@api-clients/useWhisperApiClient';
import { WhisperModelsSelect } from '@components/WhisperModelsSelect';
import { WhisperLanguagesSelect } from '@components/WhisperLanguagesSelect';

export const TranscribeAudioModule: React.FC = () => {
  const { transcribeAudio } = useWhisperApiClient();
  const audioPlayerRef = useRef<AudioPlayerHandle>(null);
  const [loading, setLoading] = useState(false);
  const [filePath, setFilepath] = useState('');
  const [transcription, setTranscription] = useState<WhisperResult>();
  const hasTranscription = Boolean(transcription);

  const generateTranscription = async () => {
    try {
      setLoading(true);
      setTranscription(await transcribeAudio({ filePath }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={1280} width="100%" marginX="auto">
      <Box display="grid" p={2} rowGap={3}>
        <Card>
          <CardContent>
            <TextField placeholder="Project Name..." />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <InputAudio
              audioPlayerRef={audioPlayerRef}
              disableAudioTools={hasTranscription}
              onChange={(audioPath) => setFilepath(audioPath)}
              height={250}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <WhisperModelsSelect />
              </Grid>
              <Grid item xs={4}>
                <WhisperLanguagesSelect />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ minHeight: 320 }}>
          <CardContent sx={{ height: '100%', pr: 1 }}>
            {hasTranscription ? (
              <Stack height={320} overflow="auto" spacing={1}>
                {transcription?.segments.map((segment, index) =>
                  segment ? (
                    <Box key={index} pr={1}>
                      <TranscriptionSegment
                        onClick={({ timestamp }) => {
                          audioPlayerRef.current?.playFromTimestamp(timestamp);
                        }}
                        segment={segment}
                      />
                    </Box>
                  ) : (
                    <React.Fragment key={index} />
                  )
                )}
              </Stack>
            ) : (
              <Box
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  disabled={loading || filePath === ''}
                  onClick={generateTranscription}
                  color="secondary"
                >
                  <Body1 fontSize={24}>Generate Transcription</Body1>
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
