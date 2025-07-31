import { py } from '@utils/py';
import { execCommand } from '@utils/execCommand';

export const transcribeAudio = (args: { filePath: string }) => {
  const { filePath } = args;
  const command = py(`transcribe.py "${filePath}" "medium"`);
  return execCommand(command);
};
