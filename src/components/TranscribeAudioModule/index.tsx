import React from 'react';
import { Box } from 'reactjs-ui-core';

export const TranscribeAudioModule: React.FC = () => {
  return (
    <Box display="grid" p={2} rowGap={2} gridTemplateRows="250px 1fr">
      <Box>A</Box>
      <Box>B</Box>
    </Box>
  );
};
