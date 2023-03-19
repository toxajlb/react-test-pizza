import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import PizzaBlock from './PizzaBlock';
import { Skeleton } from './PizzaBlock/Skeleton';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { sortList } from './Sort';
import { selectSearch, selectSortProperty } from '../redux/filter/selectors';
import { setFilters } from '../redux/filter/slice';
import { selectPizzaData } from '../redux/pizza/selectors';
import { Pizza, SearchPizzaParams } from '../redux/pizza/types';
import { fetchPizzas } from '../redux/pizza/asycActions';

type PizzaBlockItemsProps = {
  categoryId: number;
  currentPage: number;
};

const PizzaBlockItems: React.FC<PizzaBlockItemsProps> = ({ categoryId, currentPage }) => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectPizzaData);
  const sortType = useSelector(selectSortProperty);
  const searchValue = useSelector(selectSearch);
  const navigate = useNavigate();
  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const getPizzas = async () => {
    const sort = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const order = sortType.includes('-') ? 'asc' : 'desc';

    try {
      dispatch(
        fetchPizzas({
          sort,
          order,
          category,
          search,
          currentPage: String(currentPage),
        }),
      );
    } catch (error) {
      console.log('ERROR', error);
      alert('Ошибка при получении данных');
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortProperty: sortType,
          categoryId: categoryId > 0 ? categoryId : null,
          currentPage,
        },
        { addQueryPrefix: true },
      );
      navigate(queryString);

      if (!window.location.search) {
        dispatch(fetchPizzas({} as SearchPizzaParams));
      }
    }
    isMounted.current = true;
    // eslint-disable-next-line
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
    // eslint-disable-next-line
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sortBy = sortList.find((obj) => obj.sortProperty === params.sort);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sortBy || sortList[0],
        }),
      );
    }
    isMounted.current = true;
    // eslint-disable-next-line
  }, []);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items
    .filter((obj: Pizza) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: Pizza) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
    </>
  );
};

export default PizzaBlockItems;
