import * as React from 'react';
import { VISIBILITY_FILTER } from '../enums';

interface IProps {
	active:boolean;
	text:string;
	filter:VISIBILITY_FILTER;
	onClick(filter:VISIBILITY_FILTER):void;
}

class Filter extends React.Component<IProps,{}> {
	public handleClick = (ev):void => {
		ev.preventDefault();
		
		const { onClick, filter } = this.props;
		onClick(filter);
	}
	public renderActive():JSX.Element {
		return (
			<button disabled>{this.props.text}</button>
		);
	}
	public renderNotActive():JSX.Element {
		return (
			<button onClick={this.handleClick}>{this.props.text}</button>
		);
	}
	public render():JSX.Element {
		return this.props.active ? this.renderActive() : this.renderNotActive();
	}
}

export default Filter;