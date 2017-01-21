import { getJSON, setJSON } from 'local-json-storage';
import * as React from 'react';
import { connect } from 'react-redux';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';
import { ITodo } from '../interfaces';
import { addTodo, toggleTodo, flushTodo, setVisibilityFilter} from '../actions';
import { VISIBILITY_FILTER } from '../enums';
import { generateId } from '../utilities';

interface IProps {
	todos:Array<ITodo>;
	filter:VISIBILITY_FILTER;
	dispatch(action:any);
}

class App extends React.Component<IProps, {}> {
	public addTodo = (todo:string):void => {
		const id:number = generateId();
		const { dispatch } = this.props;

		dispatch(
			addTodo({ 
				id,
				todo
			}
		));

		// Write to the disk first
		setJSON('todos', [{ id, todo, completed: false }, ...this.props.todos]);
	}
	public toggleTodo = (id:number):void => {
		const { dispatch } = this.props;
		dispatch(toggleTodo(id));

		setJSON('todos', this.props.todos);
	}
	public flushTodo = ():void => {
		const { dispatch } = this.props;
		dispatch(flushTodo());

		setJSON('todos', this.props.todos.filter((todo) => {
			return !todo.completed;
		}));
	}
	public setFilter = (filter:VISIBILITY_FILTER):void => {
		const { dispatch } = this.props;
		dispatch(setVisibilityFilter(filter));
	}
	public render():JSX.Element {
		const { todos, filter } = this.props;

		return (
			<div>
				<h1>TodoApp</h1>
				<TodoForm onSubmit={this.addTodo} />
				<TodoFilter
					filter={filter} 
					onFlush={this.flushTodo}
					onFilterClicked={this.setFilter} />
				<TodoList todos={todos} filter={filter} onClickTodo={this.toggleTodo} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		todos: state.todos,
		filter: state.filter
	};
};

export default connect<{}, {}, {}>(mapStateToProps)(App);