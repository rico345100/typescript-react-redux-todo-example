import * as React from 'react';

interface IProps {
	onSubmit(text:string);
}

interface IStates {
	text: string;
}

class TodoForm extends React.Component<IProps, IStates> {
	constructor(props) {
		super(props);
		this.state = { text: '' };
	}
	public handleSubmit = (ev):void => {
		ev.preventDefault();
		this.props.onSubmit(this.state.text);

		this.setState({ text: '' });
	}
	public handleChange = (ev):void => {
		this.setState({ text: ev.target.value });
	}
	public render():JSX.Element {
		const { text } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" value={text} placeholder="Enter todo here!" onChange={this.handleChange} />
			</form>
		);
	}
}

export default TodoForm;