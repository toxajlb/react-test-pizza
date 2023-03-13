import React from 'react';
import { useSelector } from 'react-redux';
import PizzaBlock from './PizzaBlock';
import { Skeleton } from './PizzaBlock/Skeleton';
import { SearchContext } from '../App';
import { useEffect, useState } from 'react';

const PizzaBlockItems = ({ categoryId, currentPage }) => {
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = React.useContext(SearchContext);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const sort = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';

    fetch(
      `https://640af7ab65d3a01f980c2807.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${order}${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  return <div className="content__items">{isLoading ? skeletons : pizzas}</div>;
};

export default PizzaBlockItems;
