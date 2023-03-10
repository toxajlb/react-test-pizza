import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlockItems from '../components/PizzaBlockItems';
import Pagination from '../components/Pagination';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
  const { categoryId, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
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
