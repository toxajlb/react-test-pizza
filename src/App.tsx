import React from 'react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';
import { Routes, Route } from 'react-router-dom';
import CartSkeleton from './pages/CartSkeleton';

import './scss/app.scss';

const Cart = React.lazy(() => import(/*webpackChunkName: "Cart" */ './pages/Cart'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<CartSkeleton />}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
