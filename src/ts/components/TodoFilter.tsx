import * as React from 'react';
import Filter from './Filter';
import { VISIBILITY_FILTER } from '../enums';

interface IProps {
	filter:VISIBILITY_FILTER;
	onFlush();
	onFilterClicked(filter:VISIBILITY_FILTER):void;
}

class TodoFilter extends React.Component<IProps,{}> {
	public setFilter = (filter:VISIBILITY_FILTER):void => {
		this.props.onFilterClicked(filter);
	}
	public flushTodo = ():void => {
		this.props.onFlush();
	}
	public render():JSX.Element {
		const { filter } = this.props;

		return (
			<div>
				<Filter 
					active={filter === VISIBILITY_FILTER.ALL} 
					text="All" filter={VISIBILITY_FILTER.ALL} 
					onClick={this.setFilter.bind(this, VISIBILITY_FILTER.ALL)} />
				<Filter 
					active={filter === VISIBILITY_FILTER.ACTIVE} 
					text="Active" 
					filter={VISIBILITY_FILTER.ACTIVE} 
					onClick={this.setFilter.bind(this, VISIBILITY_FILTER.ACTIVE)} />
				<Filter 
					active={filter === VISIBILITY_FILTER.COMPLETED} 
					text="Done" 
					filter={VISIBILITY_FILTER.COMPLETED} 
					onClick={this.setFilter.bind(this, VISIBILITY_FILTER.COMPLETED)} />
				<button onClick={this.flushTodo}>Flush Done</button>
			</div>
		);
	}
}

export default TodoFilter;