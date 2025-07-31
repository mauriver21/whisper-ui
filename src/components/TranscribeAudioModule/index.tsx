import React, { useState } from 'react';
import { Button } from '@components/Button';
import { InputAudio } from '@components/InputAudio';
import { Body1, Box, Card, CardContent } from 'reactjs-ui-core';
import { TextField } from 'reactjs-ui-form-fields';

export const TranscribeAudioModule: React.FC = () => {
  const [transcription] = useState([]);
  const hasTranscription = Boolean(transcription.length);

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
            <InputAudio height={250} />
          </CardContent>
        </Card>
        <Card sx={{ minHeight: 200 }}>
          <CardContent sx={{ height: '100%' }}>
            {hasTranscription ? (
              transcription.map(() => <></>)
            ) : (
              <Box
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Button color="secondary">
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
