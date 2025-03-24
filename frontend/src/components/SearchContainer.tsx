import {Form, Link, useSubmit} from "react-router-dom";
import {JOB_TYPE, JOB_STATUS, JOB_SORT_BY} from "../../../utils/constants";

import {useAllJobsContext} from "../hooks/useAllJobsContext";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
// import SubmitBtn from "./SubmitBtn";

const SearchContainer = () => {
  const {searchValues} = useAllJobsContext();
  const {search, jobStatus, jobType, sort} = searchValues;

  const submit = useSubmit();
  return (
    <Wrapper>
      <Form method='get' className='form'>
        <h5 className='form-title'>Search Component</h5>
        <div className='form-center'>
          <FormRow
            type='search'
            name='search'
            labelText='Search'
            defaultValue={search}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <FormRowSelect
            name='jobStatus'
            labelText='Job Status'
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name='jobType'
            labelText='Job Type'
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name='sort'
            labelText='Sort'
            list={Object.values(JOB_SORT_BY)}
            defaultValue={sort}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <Link to='/dashboard/all-jobs' className='btn btn-block form-btn text-small'>
            Reset filter
          </Link>
          {/* <SubmitBtn formBtn /> */}
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
