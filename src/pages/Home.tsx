import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort/Sort";
import { FC, useEffect } from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories/Categories";
import Pagination from "../components/Pagination/Pagination";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas } from "../redux/slices/PizzasSlice";
import ErrorText from "../components/ErrorText/ErrorText";

const Home: FC = () => {
  const { categoryId, sort, currentPage } = useSelector(
    (state: any) => state.filter
  );
  const { items, status } = useSelector((state: any) => state.pizzas);
  const sortType = sort.sortProperty;
  const searchValue = useSelector((state: any) => state.filter.searchValue);

  const dispatch = useDispatch();

  const fetchPizza = async () => {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      //@ts-ignore
      fetchPizzas({ sortBy, order, category, search, currentPage, searchValue })
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchPizza();
  }, [categoryId, sortType, searchValue, currentPage]);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };
  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      {status === "error" ? (
        <ErrorText />
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
