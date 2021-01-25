import React, { Component } from 'react'


class Task extends React.Component {

	constructor(props) {
		super(props);

	}

	render() {
		return (
			<>
				<li key={this.props.data.id} contentEditable="true" 
				onClick={() => this.props.editHandler(this.props.data.id)}> 
					{this.props.data.text} 
				</li>
				<span onClick={() => this.props.subTaskHandler(this.props.data.id)}> see sub-tasks </span>
				<span onClick={() => this.props.deleteHandler(this.props.data.id)}> delete task </span>
			</>

		)
	}

}


export default Task;