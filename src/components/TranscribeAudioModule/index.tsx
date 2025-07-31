import React, { useRef, useState } from 'react';
import { Button } from '@components/Button';
import { InputAudio } from '@components/InputAudio';
import { Body1, Box, Card, CardContent, Grid, Stack } from 'reactjs-ui-core';
import { TextField, useForm } from 'reactjs-ui-form-fields';
import { WhisperResult } from '@interfaces/WhisperResult';
import { TranscriptionSegment } from '@components/TranscriptionSegment';
import { AudioPlayerHandle } from '@components/AudioPlayer';
import { useWhisperApiClient } from '@api-clients/useWhisperApiClient';
import { WhisperModelsSelect } from '@components/WhisperModelsSelect';
import { WhisperLanguagesSelect } from '@components/WhisperLanguagesSelect';
import { getRelativeScrollTop } from '@utils/getRelativeScrollTop';
import { FormSchema, useSchema } from './useSchema';

export const TranscribeAudioModule: React.FC = () => {
  const { transcribeAudio } = useWhisperApiClient();
  const transcriptionPanelRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<AudioPlayerHandle>(null);
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState<WhisperResult>();
  const hasTranscription = Boolean(transcription);
  const schema = useSchema();
  const form = useForm(schema);

  const generateTranscription = async (data: FormSchema) => {
    try {
      setLoading(true);
      setTranscription(await transcribeAudio(data));
    } finally {
      setLoading(false);
    }
  };

  const onTimeChange = (seconds: number) => {
    const segment = transcription?.segments.find(
      (item) => seconds >= item.start && seconds < item.end
    );

    if (segment) {
      const segmentStart = Math.floor(segment.start);
      const container = transcriptionPanelRef.current;
      const item = container?.querySelector?.(
        `#segment-${segmentStart}`
      ) as HTMLElement;
      const relativeScrollTop = getRelativeScrollTop(container, item);
      relativeScrollTop !== undefined &&
        container?.scrollTo({ top: relativeScrollTop });
    }
  };

  return (
    <form
      style={{ display: 'contents' }}
      onSubmit={form.handleSubmit(generateTranscription as any)}
    >
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
                onTimeChange={(args) => {
                  onTimeChange(args.seconds);
                }}
                control={form.control}
                name="filePath"
                audioPlayerRef={audioPlayerRef}
                disableAudioTools={hasTranscription}
                height={250}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <WhisperModelsSelect control={form.control} name="model" />
                </Grid>
                <Grid item xs={4}>
                  <WhisperLanguagesSelect
                    control={form.control}
                    name="language"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card sx={{ minHeight: 320 }}>
            <CardContent sx={{ height: '100%', pr: 1 }}>
              {hasTranscription ? (
                <div
                  style={{ height: 320, overflow: 'auto' }}
                  ref={transcriptionPanelRef}
                >
                  <Stack spacing={1}>
                    {transcription?.segments.map((segment, index) =>
                      segment ? (
                        <Box
                          id={`segment-${Math.floor(segment.start)}`}
                          key={index}
                          pr={1}
                        >
                          <TranscriptionSegment
                            onClick={({ timestamp }) => {
                              audioPlayerRef.current?.playFromTimestamp(
                                timestamp
                              );
                            }}
                            segment={segment}
                          />
                        </Box>
                      ) : (
                        <React.Fragment key={index} />
                      )
                    )}
                  </Stack>
                </div>
              ) : (
                <Box
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button
                    type="submit"
                    disabled={loading || form.isInvalid()}
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
    </form>
  );
};
