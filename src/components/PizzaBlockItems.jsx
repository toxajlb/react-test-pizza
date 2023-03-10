import React from 'react';
import PizzaBlock from './PizzaBlock';
import { Skeleton } from './PizzaBlock/Skeleton';

import { useEffect, useState } from 'react';

const PizzaBlockItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://640af7ab65d3a01f980c2807.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="content__items">
      {isLoading
        ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
        : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
    </div>
  );
};

export default PizzaBlockItems;
