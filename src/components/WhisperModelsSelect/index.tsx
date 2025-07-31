import { WhisperModel } from '@constants/enums';
import { useMemo } from 'react';
import { Select, SelectProps } from 'reactjs-ui-form-fields';

export type WhisperModelsSelectProps = Omit<SelectProps, 'options'>;

export const WhisperModelsSelect: React.FC<WhisperModelsSelectProps> = (
  props
) => {
  const options = useMemo(
    () => [
      { value: WhisperModel.Tiny, label: 'Tiny' },
      { value: WhisperModel.Base, label: 'Base' },
      { value: WhisperModel.Small, label: 'Small' },
      { value: WhisperModel.Medium, label: 'Medium' },
      { value: WhisperModel.Large, label: 'Large' },
    ],
    []
  );

  return <Select label="Model" options={options} {...props} />;
};
