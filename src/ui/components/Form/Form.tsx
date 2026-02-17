import React, { FunctionComponent } from 'react';

import Button from '../Button/Button';
import InputText, { InputTextProps } from '../InputText/InputText';
import $ from './Form.module.css';

interface FormEntry {
  name: string;
  placeholder: string;
  // Extra props get passed through to the InputText component
  extraProps: Omit<InputTextProps, 'name' | 'placeholder'>;
}

interface FormProps {
  label: string;
  loading: boolean;
  formEntries: FormEntry[];
  onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  submitText: string;
}

const Form: FunctionComponent<FormProps> = ({
  label,
  loading,
  formEntries,
  onFormSubmit,
  submitText
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <fieldset>
        <legend>{label}</legend>
        {formEntries.map(({ name, placeholder, extraProps }, index) => (
          <div key={`${name}-${index}`} className={$.formRow}>
            <InputText
              key={`${name}-${index}`}
              name={name}
              placeholder={placeholder}
              {...extraProps}
            />
          </div>
        ))}

        <Button loading={loading} type="submit">
          {submitText}
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
