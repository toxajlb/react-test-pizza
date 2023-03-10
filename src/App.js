import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlockItems from './components/PizzaBlockItems';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <PizzaBlockItems />
        </div>
      </div>
    </div>
  );
}

export default App;
