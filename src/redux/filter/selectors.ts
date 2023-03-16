import { RootState } from '../store';

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
export const selectSortProperty = (state: RootState) => state.filter.sort.sortProperty;
export const selectSearch = (state: RootState) => state.filter.searchValue;
