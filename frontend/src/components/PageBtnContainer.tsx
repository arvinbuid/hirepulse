import {HiChevronDoubleLeft, HiChevronDoubleRight} from "react-icons/hi";
import {useAllJobsContext} from "../hooks/useAllJobsContext";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import {useLocation, useNavigate} from "react-router-dom";
import {JSX} from "react";

const PageBtnContainer = () => {
  const {
    data: {numOfPages, currentPage},
  } = useAllJobsContext();
  const {search, pathname} = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber.toString());
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = (pageNumber: number, activeClass: boolean) => {
    return (
      <button
        key={pageNumber}
        className={`btn page-btn ${activeClass && "active"}`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButton = () => {
    const pageButtons: JSX.Element[] = [];

    // first page
    pageButtons.push(addPageButton(1, currentPage === 1));

    // dots
    if (currentPage > 3) {
      pageButtons.push(
        <span className='page-btn dots' key='dots-1'>
          ...
        </span>
      );
    }

    // page before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(addPageButton(currentPage - 1, false));
    }

    // current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(addPageButton(currentPage, true));
    }

    // page after current page
    if (currentPage !== numOfPages - 1 && currentPage !== numOfPages) {
      pageButtons.push(addPageButton(currentPage + 1, false));
    }

    // dots
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className='page-btn dots' key='dots-2'>
          ...
        </span>
      );
    }

    // last page
    pageButtons.push(addPageButton(numOfPages, currentPage === numOfPages));
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className='btn prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>{renderPageButton()}</div>
      <button
        className='btn next-btn'
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
