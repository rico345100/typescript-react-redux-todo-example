import * as React from 'react';
import { ITodo } from '../interfaces';

interface IProps extends ITodo {
	onClick(id:number):void;
}

class Todo extends React.Component<IProps, {}> {
	public handleClick = (ev) => {
		ev.preventDefault();
		this.props.onClick(this.props.id);
	}
	public renderActive(todo):JSX.Element {
		return (
			<li onClick={this.handleClick} style={{ cursor: 'pointer' }}>{todo}</li>
		);
	}
	public renderCompleted(todo):JSX.Element {
		return (
			<li onClick={this.handleClick} style={{ cursor: 'pointer', color: 'red' }}><del>{todo}</del></li>
		);
	}
	public render():JSX.Element {
		const { todo } = this.props;
		return this.props.completed ? this.renderCompleted(todo) : this.renderActive(todo);
	}
}

export default Todo;