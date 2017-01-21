import './polyfills';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { store } from './store';
import { getJSON, setJSON } from 'local-json-storage';
import { addTodo } from './actions';

// Initialize todos in localStorage if not set
if(!getJSON('todos')) {
	setJSON('todos', []);
}

// Let's load persisted todos from disk
const savedTodos = getJSON('todos');
savedTodos.reverse().map((todo) => {
	store.dispatch(addTodo(todo));
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
, document.getElementById('entry'));