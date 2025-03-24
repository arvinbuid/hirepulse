import {Form} from "react-router-dom";
import {JOB_TYPE, JOB_STATUS, JOB_SORT_BY} from "../../../utils/constants";

import Wrapper from "../assets/wrappers/DashboardFormPage";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import SubmitBtn from "./SubmitBtn";

const SearchContainer = () => {
  return (
    <Wrapper>
      <Form method='get' className='form'>
        <h5 className='form-title'>Search Component</h5>
        <div className='form-center'>
          <FormRow type='search' name='search' labelText='Search' defaultValue='a' />
          <FormRowSelect
            name='jobStatus'
            labelText='Job Status'
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue='all'
          />
          <FormRowSelect
            name='jobType'
            labelText='Job Type'
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue='all'
          />
          <FormRowSelect
            name='sort'
            labelText='Sort'
            list={Object.values(JOB_SORT_BY)}
            defaultValue='all'
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
