import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlockItems from '../components/PizzaBlockItems';
import Pagination from '../components/Pagination';
import { setCategoryId, setCurrentPage, selectPizzaData } from '../redux/slices/filterSlice';

const Home: React.FC = () => {
  const { categoryId, currentPage } = useSelector(selectPizzaData);
  const dispatch = useDispatch();

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <PizzaBlockItems categoryId={categoryId} currentPage={currentPage} />
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
