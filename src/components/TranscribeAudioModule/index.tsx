import React, { useState } from 'react';
import { Button } from '@components/Button';
import { InputAudio } from '@components/InputAudio';
import { Body1, Body2, Box, Card, CardContent, Stack } from 'reactjs-ui-core';
import { TextField } from 'reactjs-ui-form-fields';
import { transcribeAudio } from '@commands/transcribeAudio';

export const TranscribeAudioModule: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [filePath, setFilepath] = useState('');
  const [transcription, setTranscription] = useState('');
  const hasTranscription = Boolean(transcription);

  const generateTranscription = async () => {
    try {
      setLoading(true);
      const result = await transcribeAudio({ filePath });
      setTranscription(result.stdOut);
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
              disableAudioTools={hasTranscription}
              onChange={(audioPath) => setFilepath(audioPath)}
              height={250}
            />
          </CardContent>
        </Card>
        <Card sx={{ minHeight: 200 }}>
          <CardContent sx={{ height: '100%' }}>
            {hasTranscription ? (
              <Stack spacing={1}>
                {transcription
                  .split(/\n/)
                  .map((text, index) =>
                    text ? (
                      <Body2 key={index}>{text}</Body2>
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
