import {ChangeEvent} from "react";
import {JOB_STATUS} from "../../../utils/constants";

interface FormRowSelectProps {
  name: string;
  list: string[];
  labelText: string;
  defaultValue?: (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  onChange,
}: FormRowSelectProps) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        className='form-select'
        defaultValue={defaultValue}
        autoComplete='on'
        onChange={onChange}
      >
        {list.map((status) => {
          return (
            <option value={status} key={status}>
              {status}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
