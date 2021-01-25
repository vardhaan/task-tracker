import React, { Component } from 'react'
import DataAccessor from './DataAccessor.js'
import Task from './Task.js'
import InputArea from './InputArea.js'
import EditArea from './EditArea.js'

class TaskList extends React.Component {

	constructor(props) {
		super(props);

		this.dataPopulator = new DataAccessor();
		var initialChildren = this.dataPopulator.getChildren(0);

		this.state = {
			currentParent: 0,
			currentChildren: initialChildren, //currentChildren should probably be a map, not an array
			currentlyBeingEdited: null,
		};
		this.getChildren = this.getChildren.bind(this);
		this.getParentSiblings = this.getParentSiblings.bind(this);
		this.createNewTask = this.createNewTask.bind(this);
		this.modifyTaskText = this.modifyTaskText.bind(this);
		this.setTaskEditable = this.setTaskEditable.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
		
		
	}

	getChildren(nodeID) {
		console.log("got here ", nodeID)
		var children = this.dataPopulator.getChildren(nodeID);
		console.log("got here 2 ", children);
		console.log("hiiii")
		this.setState({
			currentParent: nodeID,
			currentChildren: children
		});
	}

	getParentSiblings(parentID) {
		if(parentID === 0) {
			return;
		}
		var parentOfParent = this.dataPopulator.getParent(parentID);
		var siblingsOfParent = this.dataPopulator.getChildren(parentOfParent.id);
		this.setState({
			currentParent: parentOfParent.id,
			currentChildren: siblingsOfParent
		})

	}

	createNewTask(text) {
		if(text !== null && text !== "") {
			var newNode = this.dataPopulator.addNewNode(text, this.state.currentParent);
			this.setState({
				currentChildren: [...this.state.currentChildren, newNode]
			});
		}
		
	}

	modifyTaskText(newText, nodeID) {
		//could be some issues here due to pass by reference vs value? since
		//i might be directly trying to modify state objects
		console.log("reaching here?")
		var nodeToModify = null;
		var childrenArray = this.state.currentChildren;
		var index = 0;
		for (let i=0; i<childrenArray.length;i++) {
			if (childrenArray[i].id === nodeID) {
				nodeToModify = childrenArray[i];
				index = i;
			}
		}
		if (nodeToModify == null) {
			console.log("surely not here?");
			return;
		}
		nodeToModify.text = newText;
		this.dataPopulator.editNode(nodeToModify);
		console.log(this.childrenArray)
		this.setState({
			currentChildren: childrenArray
		});
		this.setTaskUnEditable(nodeID);
	}

	setTaskUnEditable(taskID) {
		this.setState({
			currentlyBeingEdited: null
		});
	}

	setTaskEditable(taskID) {
		this.setState({
			currentlyBeingEdited: taskID
		});
	}

	deleteTask(taskID) {
		//for right now, just delete the node. Don't delete the subtree underneath
		console.log("where we at?")
		this.dataPopulator.deleteNode(taskID);
		this.getChildren(this.state.currentParent);

	}

	taskListMapper() {
		var editingTaskID = this.state.currentlyBeingEdited;
		return (
			<>
			{this.state.currentChildren.map((task) => {
				if (task.id === editingTaskID) {
					return <EditArea submitHandler={this.modifyTaskText} initialData={task}/>
				} else {
					return <Task subTaskHandler={this.getChildren} editHandler={this.setTaskEditable}
						data={task} deleteHandler={this.deleteTask} />
				}
			})}
			</>

		)
	}


	render() {

		console.log(this.state.currentChildren);
		var btn = null;
		if (this.state.currentParent !== 0) {
			btn = <button onClick={() => this.getParentSiblings(this.state.currentParent)}>
					Back
				</button>
		}
		return (
			<>
				{btn}
				<ul>
					{this.taskListMapper()}
					
					<InputArea submitHandler={this.createNewTask} />

				</ul>
				

			</>

		);
	}

}



export default TaskList;