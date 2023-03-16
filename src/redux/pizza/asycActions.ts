import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, search, sort, order, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://640af7ab65d3a01f980c2807.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${order}${search}`,
    );
    return data;
  },
);
