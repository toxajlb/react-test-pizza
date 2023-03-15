import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PizzaBlock from './PizzaBlock';
import { Skeleton } from './PizzaBlock/Skeleton';
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { setFilters, selectSortProperty, selectSearch } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { sortList } from './Sort';

const PizzaBlockItems = ({ categoryId, currentPage }) => {
  const dispatch = useDispatch();
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
          currentPage,
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
    }
    isMounted.current = true;
    // eslint-disable-next-line
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
    // eslint-disable-next-line
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((item) => (
      <Link key={item.id} to={`/pizza/${item.id}`}>
        <PizzaBlock {...item} />{' '}
      </Link>
    ));

  return (
    <>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
    </>
  );
};

export default PizzaBlockItems;
