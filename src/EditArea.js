import React, { Component } from 'react'
import './InputArea.css' //TODO: need to update this

class EditArea extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newText: this.props.initialData.text
		}
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onKeyDown(e) {
		if (e.keyCode == 13 && e.shiftKey == false) {
			e.preventDefault();
			console.log("default prevented");
			this.onSubmit(this.state.newText);
		}
		return;

	}

	onChange(e) {
		this.setState({
			newText: e.target.value
		});
	}

	onSubmit(text) {
		if (text === null || text === "") {
			text = this.props.initialData.text;
		}
		this.props.submitHandler(text, this.props.initialData.id);
		this.setState({
			newText: text
		})

	}

	onBlur(e) {
		this.onSubmit(this.state.newText);
	}

	render() {
		console.log(this.state.newText)
		return (
			<form>
				<textarea onKeyDown={this.onKeyDown} onChange={this.onChange}
				placeholder={this.state.newText} onBlur={this.onBlur}
				autoFocus value={this.state.newText}/>
			</form>
		)
	}


}

export default EditArea;