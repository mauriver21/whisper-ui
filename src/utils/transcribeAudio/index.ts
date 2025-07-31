import { py } from '@utils/py';
import { execCommand } from '@utils/execCommand';
import { jsonParse } from '@utils/jsonParse';
import { WhisperResult } from '@interfaces/WhisperResult';

export const transcribeAudio = async (args: { filePath: string }) => {
  const { filePath } = args;
  const command = py(`transcribe.py "${filePath}" "medium"`);
  const result = await execCommand(command);
  return jsonParse<WhisperResult>(result.stdOut);
};
