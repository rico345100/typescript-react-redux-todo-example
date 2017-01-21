import { createStore, combineReducers } from 'redux';
import todoReducer from './reducers';

export const store = createStore(todoReducer);