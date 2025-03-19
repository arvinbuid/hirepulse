import {ChangeEvent} from "react";

interface FormRowProps {
  name: string;
  type: string;
  labelText: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormRow = ({name, type, labelText, defaultValue = "", onChange}: FormRowProps) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className='form-input'
        defaultValue={defaultValue}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormRow;
