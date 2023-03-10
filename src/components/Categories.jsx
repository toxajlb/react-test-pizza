import React from 'react';
import { useState } from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            className={activeIndex === i ? 'active' : ''}
            onClick={() => setActiveIndex(i)}
            key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
