

export default class DataAccessor {

	localStorageKey = 'tasktrackertasks'

	data = [
		{
			id: 0,
			text: "",
			parent: -1,
			children: [1, 2]
		},
		{
			id: 1,
			text: "Project 1",
			parent: 0,
			children: [3]
		},
		{
			id: 2,
			text: "Project 2",
			parent: 0,
			children: [],
		},
		{
			id: 3,
			text: "Task 1",
			parent: 1,
			children: [4]
		}, 
		{
			id: 4,
			text: "Sub-task 1",
			parent: 3,
			children: []
		}
	]

	constructor() {
		var storedData = localStorage.getItem(this.localStorageKey)
		this.populateLocalStorage = this.populateLocalStorage.bind(this);
		if(!storedData) {
			console.log("localstorage needs to be filled");
			this.populateLocalStorage();
		} else {
			console.log("localstorage already has it");
			this.data = JSON.parse(storedData);
		}
		
	}

	populateLocalStorage() {
		var stringifiedData = JSON.stringify(this.data);
		localStorage.setItem(this.localStorageKey, stringifiedData);
	}

	//return obj of parent node containing id, text, parent (IDs), children (ID array)
	getParent(nodeID) {
		var currentNode = this.data[nodeID];
		var parentNode = this.data[currentNode.parent];
		return parentNode;
	}

	//return array of child node objs containing id, text, parent (IDs), children (ID array)
	getChildren(nodeID) {
		var childNode = this.data[nodeID];
		console.log(childNode);
		var childrenArray = [];
		for (let i=0; i<childNode.children.length;i++) {
			childrenArray.push(this.data[childNode.children[i]]);
		}
		console.log(childrenArray);
		return childrenArray;
	}

	addNewNode(newText, newParent) {
		var newID = this.data[this.data.length-1].id + 1;
		var newNode = {
			id: newID,
			text: newText,
			parent: newParent,
			children: []
		}
		this.data.push(newNode);
		this.data[newParent].children.push(newID)
		this.populateLocalStorage();
		return newNode;
	}

	editNode(modifiedNode) {
		var id = modifiedNode.id;
		var oldNode = this.data[id];
		oldNode.text = modifiedNode.text;
		oldNode.parent = modifiedNode.parent;
		oldNode.children = modifiedNode.children;
		this.populateLocalStorage();
	}

	getNode(nodeID) {
		return this.data[nodeID];
	}

	deleteNode(nodeID) {
		//does not delete node or its children! 
		//just delete references to node from parent (otherwise would have indexing issues)
		//TODO: perhaps add that ability
		var nodeToDelete = this.data[nodeID];
		var parentNode = this.data[nodeToDelete.parent];
		var newChildrenArray = parentNode.children.filter(node => node !== nodeID);
		console.log(newChildrenArray, nodeID);
		this.data[nodeToDelete.parent].children = newChildrenArray;
		this.populateLocalStorage();

	}



}