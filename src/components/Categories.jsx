import React from 'react';

const Categories = ({ categoryId, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            className={categoryId === i ? 'active' : ''}
            onClick={() => onChangeCategory(i)}
            key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
