import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

const FullPizza = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://640af7ab65d3a01f980c2807.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении данных');
        navigate('/');
      }
    }
    fetchPizza();
    // eslint-disable-next-line
  }, []);

  if (!pizza) {
    return <Skeleton />;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
