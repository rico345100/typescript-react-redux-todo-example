import { Reducer, Action } from 'redux';
import { VISIBILITY_FILTER } from '../enums';
import { ITodo } from '../interfaces';
import { ITodoAction, ADD_TODO, TOGGLE_TODO, FLUSH_TODO, SET_VISIBILITY_FILTER } from '../actions';

interface IDefaultState {
	todos:Array<ITodo>;
	filter:VISIBILITY_FILTER;
}

const defaultState:IDefaultState = {
	todos: [],
	filter: VISIBILITY_FILTER.ALL
};

interface ITodoReducerAction extends ITodoAction {
	filter: VISIBILITY_FILTER;
}

export default function todoReducer(state = defaultState, action:ITodoReducerAction) {
	switch(action.type) {
		case ADD_TODO:
			return Object.assign({}, state, {
				todos: [
					{ id: action.id , todo: action.todo, completed: action.completed },
					...state.todos
				]
			});
		case TOGGLE_TODO:
			let newTodos = [...state.todos];

			newTodos.map((todo) => {
				if(todo.id === action.id) {
					todo.completed = !todo.completed;
				}
			});

			return Object.assign({}, state, {
				todos: newTodos
			});
		case FLUSH_TODO:
			let flushedTodos = state.todos.filter((todo) => {
				return !todo.completed;
			});

			return Object.assign({}, state, {
				todos: flushedTodos
			});
		case SET_VISIBILITY_FILTER:
			return Object.assign({}, state, {
				filter: action.filter
			});
		default:
			return state;
	}
}