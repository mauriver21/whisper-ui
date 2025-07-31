import { useMemo } from 'react';
import { Select, SelectProps } from 'reactjs-ui-form-fields';

export type WhisperLanguagesSelectProps = Omit<SelectProps, 'options'>;

export const WhisperLanguagesSelect: React.FC<WhisperLanguagesSelectProps> = (
  props
) => {
  const options = useMemo(
    () => [
      { value: 'auto', label: 'Auto' },
      { value: 'es', label: 'Spanish' },
      { value: 'en', label: 'English' },
    ],
    []
  );

  return <Select label="Language" options={options} {...props} />;
};
