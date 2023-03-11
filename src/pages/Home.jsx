import React from 'react';
import { useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlockItems from '../components/PizzaBlockItems';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
        <Sort sortType={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <PizzaBlockItems
        categoryId={categoryId}
        sortType={sortType}
        searchValue={searchValue}
        currentPage={currentPage}
      />
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
