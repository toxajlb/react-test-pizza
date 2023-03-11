import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlockItems from '../components/PizzaBlockItems';

const Home = () => {
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <PizzaBlockItems />
    </div>
  );
};

export default Home;
