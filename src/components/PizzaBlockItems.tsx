import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import PizzaBlock from './PizzaBlock';
import { Skeleton } from './PizzaBlock/Skeleton';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { setFilters, selectSortProperty, selectSearch } from '../redux/slices/filterSlice';
import { fetchPizzas, Pizza, SearchPizzaParams, selectPizzaData } from '../redux/slices/pizzaSlice';
import { sortList } from './Sort';

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
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const sort = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';

    try {
      dispatch(
        fetchPizzas({
          category,
          search,
          sort,
          order,
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
          categoryId,
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
