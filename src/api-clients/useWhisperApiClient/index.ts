import { py } from '@utils/py';
import { execCommand } from '@utils/execCommand';
import { jsonParse } from '@utils/jsonParse';
import { WhisperResult } from '@interfaces/WhisperResult';
import { WhisperModel } from '@constants/enums';

export const useWhisperApiClient = () => {
  const transcribeAudio = async (args: {
    filePath: string;
    model: WhisperModel;
    language?: string;
  }) => {
    const { filePath, model = WhisperModel.Medium, language } = args;
    const command = py([
      'transcribe.py',
      `"${filePath}"`,
      `"${model}"`,
      `"${language}"`,
    ]);
    const result = await execCommand(command);
    return jsonParse<WhisperResult>(result.stdOut);
  };

  return { transcribeAudio };
};
