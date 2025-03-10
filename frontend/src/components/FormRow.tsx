interface FormRowProps {
  name: string;
  type: string;
  labelText: string;
  defaultValue: string;
}

const FormRow = ({name, type, labelText, defaultValue}: FormRowProps) => {
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
        required
      />
    </div>
  );
};

export default FormRow;
