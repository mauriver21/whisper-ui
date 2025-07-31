import { WhisperModel } from '@constants/enums';
import { schema, Schema } from 'reactjs-ui-form-fields';

export type FormSchema = {
  model: WhisperModel;
  filePath: string;
  language?: string;
};

export const useSchema = () => {
  const result: Schema<FormSchema> = schema.object({
    model: schema
      .mixed<WhisperModel>()
      .oneOf(Object.values(WhisperModel))
      .required()
      .default(WhisperModel.Medium),
    language: schema.string().default('auto'),
    filePath: schema.string().required().default(''),
  });

  return result;
};
