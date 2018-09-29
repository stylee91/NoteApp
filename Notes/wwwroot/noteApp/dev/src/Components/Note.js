import React, { Component } from 'react';
import axios from 'axios'


class Note extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            display: "none",
            titleValue: "",
            descriptionValue: ""
        }
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data });
    }

    handleDeleteClick(){
        axios.delete(`https://localhost:44335/api/Note/` + this.state.data.id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        this.props.updateNotes();
    }

    handleEditClick() {
        if(this.state.display === "none"){
            this.setState({display: "flex"});
        }else{
            this.setState({display: "none"});
        }

    }

    handleTitleChange(event) {
        console.log(this.state.titleValue);
        this.setState({titleValue: event.target.value});
    }

    handleDescriptionChange(event) {
        console.log(this.state.descriptionValue);
        this.setState({descriptionValue: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const note = {
            "title": this.state.titleValue.toString(),
            "description": this.state.descriptionValue.toString()
        };

        let req = {
            url: `https://localhost:44335/api/Note/` + this.state.data.id,
            method: 'PUT',
            data: note
        };
        axios(req).then( response => {
            console.log(response)
        });
        this.props.updateNotes();
        this.handleEditClick()
        this.setState({titleValue: ""});
        this.setState({descriptionValue: ""});
    }

    render() {
        return (

            <div className="note-container">
                <div className="note-title">
                    <div>
                        {this.state.data.title}
                    </div>
                </div>
                <div className="note-description"> {this.state.data.description} </div>
                <div className="button-container">
                    <button className="note-button" onClick={this.handleEditClick}>Edit</button>
                    <button className="note-button" onClick={this.handleDeleteClick}>Delete</button>
                </div>
                <div style={{ display: this.state.display }}>
                    <form className="note-form" onSubmit={this.handleSubmit}>
                        <label>
                            Title:
                            <input type="text" value = {this.state.titleValue} name="Title" onChange={this.handleTitleChange}/>
                        </label>
                        <label>
                            Description:
                            <input type="text" value = {this.state.descriptionValue} name="Description" onChange={this.handleDescriptionChange}/>
                        </label>
                        <div className="button-container">
                            <button>Confirm</button>
                        </div>
                    </form>
                </div>

            </div>



        );
    }
}

export default Note;