import { FC } from "react";
import style from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

type PaginationPropsType = {
  onChangePage: (page: number) => void;
  currentPage: number;
};

const Pagination: FC<PaginationPropsType> = ({ onChangePage, currentPage }) => {
  return (
    <div>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={3}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
