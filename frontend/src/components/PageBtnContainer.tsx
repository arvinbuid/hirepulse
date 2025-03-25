import {HiChevronDoubleLeft, HiChevronDoubleRight} from "react-icons/hi";
import {useAllJobsContext} from "../hooks/useAllJobsContext";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () => {
  const {
    data: {numOfPages, currentPage},
  } = useAllJobsContext();
  const pages = Array.from({length: numOfPages}, (_, index) => index + 1);

  return (
    <Wrapper>
      <button className='btn prev-btn'>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((page) => {
          return (
            <button key={page} className={`btn page-btn ${page === currentPage && "active"}`}>
              {page}
            </button>
          );
        })}
      </div>
      <button className='btn next-btn'>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
