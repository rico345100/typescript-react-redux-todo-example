import * as React from 'react';
import Todo from './Todo';
import { VISIBILITY_FILTER } from '../enums';
import { ITodo } from '../interfaces';

interface IProps {
	todos:Array<ITodo>;
	onClickTodo(id:number):void;
	filter:VISIBILITY_FILTER;
}

class TodoList extends React.Component<IProps, {}> {
	static defaultProps:IProps = {
		todos: [],
		onClickTodo:() => {},
		filter: VISIBILITY_FILTER.ALL
	}
	public render():JSX.Element {
		const { todos, onClickTodo, filter } = this.props;
		const filteredTodo = todos.filter((todo) => {
			if(filter === VISIBILITY_FILTER.ALL) {
				return true;
			}
			else if(filter === VISIBILITY_FILTER.ACTIVE) {
				return !todo.completed;
			}
			else if(filter === VISIBILITY_FILTER.COMPLETED) {
				return todo.completed;
			}
		});

		return (
			<ul>
				{filteredTodo.map(todo =>
					<Todo key={todo.id} {...todo} onClick={onClickTodo} />
				)}
			</ul>
		);
	}
}
export default TodoList;