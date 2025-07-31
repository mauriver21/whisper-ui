import { WhisperSegment } from '@interfaces/WhisperSegment';

export type WhisperResult = {
  text: string;
  segments: WhisperSegment[];
  language: string;
};
