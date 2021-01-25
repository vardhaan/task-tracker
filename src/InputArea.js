import React, { Component } from 'react'
import './InputArea.css'

class InputArea extends Component {

	constructor(props) {
		super(props);
		this.state = {
			enteredText: ""
		}
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onKeyDown(e) {
		if (e.keyCode == 13 && e.shiftKey == false) {
			e.preventDefault();
			console.log("default prevented");
			this.onSubmit(this.state.enteredText);
		}
		return;

	}

	onChange(e) {
		console.log("huh? ", e.target.value);
		this.setState({
			enteredText: e.target.value
		})
	}

	onSubmit(text) {
		this.props.submitHandler(text);
		this.setState({
			enteredText: ""
		})
	}

	onBlur(e) {
		this.onSubmit(this.state.enteredText);
	}

	render() {
		console.log(this.state.enteredText)
		return (
			<form>
				<textarea onKeyDown={this.onKeyDown} onChange={this.onChange}
				placeholder="Enter a new task" onBlur={this.onBlur}
				autoFocus value={this.state.enteredText}/>
			</form>
		)
	}


}

export default InputArea;