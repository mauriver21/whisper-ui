import { AudioPlayer } from '@components/AudioPlayer';
import { Button } from '@components/Button';
import React, { useState } from 'react';
import { Body1, Box, Card, CardContent } from 'reactjs-ui-core';

export const TranscribeAudioModule: React.FC = () => {
  const [transcription, setTranscription] = useState([]);
  const hasTranscription = Boolean(transcription.length);

  return (
    <Box maxWidth={1280} width="100%" marginX="auto">
      <Box display="grid" p={2} rowGap={3} gridTemplateRows="330px 1fr">
        <Card>
          <CardContent>
            <AudioPlayer
              height={250}
              url="https://cdn.freesound.org/previews/817/817943_5674468-lq.mp3"
            />
          </CardContent>
        </Card>
        <Card sx={{ minHeight: 200 }}>
          <CardContent sx={{ height: '100%' }}>
            {hasTranscription ? (
              transcription.map((item) => <></>)
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
