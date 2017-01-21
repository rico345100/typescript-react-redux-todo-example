import { Action } from 'redux';
import { VISIBILITY_FILTER } from '../enums';

export interface ITodoParam {
	id?:number;
	todo:string;
	completed?:boolean;
}

export interface ITodoAction extends Action {
	id?:number;
	todo?:string;
	completed?:boolean;
}

export const ADD_TODO:string = 'ADD_TODO';
export function addTodo(todoData:ITodoParam) {
	return {
		type: ADD_TODO,
		id: todoData.id || undefined,
		todo: todoData.todo,
		completed: todoData.completed || false
	};
}

export const TOGGLE_TODO:string = 'TOGGLE_TODO';
export function toggleTodo(id:number) {
	return {
		type: TOGGLE_TODO,
		id
	}
}

export const FLUSH_TODO:string = 'FLUSH_TODO';
export function flushTodo() {
	return {
		type: FLUSH_TODO
	};
}

export const SET_VISIBILITY_FILTER:string = 'SET_VISIBILITY_FILTER';
export function setVisibilityFilter(filter:VISIBILITY_FILTER) {
	return {
		type: SET_VISIBILITY_FILTER,
		filter
	};
}