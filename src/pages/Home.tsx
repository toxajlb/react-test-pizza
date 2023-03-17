import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Categories, Sort, Pagination, PizzaBlockItems } from '../components';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';

const Home: React.FC = () => {
  const { categoryId, currentPage } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onChangeCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
    // eslint-disable-next-line
  }, []);

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
