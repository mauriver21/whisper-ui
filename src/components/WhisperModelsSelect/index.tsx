import { useMemo } from 'react';
import { Select, SelectProps } from 'reactjs-ui-form-fields';

export type WhisperModelsSelectProps = Omit<SelectProps, 'options'>;

export const WhisperModelsSelect: React.FC<WhisperModelsSelectProps> = (
  props
) => {
  const options = useMemo(
    () => [
      { value: 'tiny', label: 'Tiny' },
      { value: 'base', label: 'Base' },
      { value: 'small', label: 'Small' },
      { value: 'large', label: 'Large' },
    ],
    []
  );

  return <Select label="Model" options={options} {...props} />;
};
