import React, { Component } from 'react';
import Note from "./Note";
import axios from 'axios'


class Content extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: this.props.data,
            titleValue : "",
            descriptionValue: ""
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data });
    }

    handleTitleChange(event) {
        this.setState({titleValue: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({descriptionValue: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const note = {
            "title": this.state.titleValue.toString(),
            "description": this.state.descriptionValue.toString()
        };

        let req = {
            url: `https://localhost:44335/api/Note`,
            method: 'POST',
            data: note
        };
        axios(req).then( response => {
            console.log(response)
        })
        this.props.updateNotes();
        this.setState({titleValue: ""});
        this.setState({descriptionValue: ""});
    }


    render() {
        return (
            <div className="content-wrapper">
                <div className="content-form">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Title:
                            <input type="text" value = {this.state.titleValue} onChange={this.handleTitleChange} />
                        </label>
                        <label>
                            Description:
                            <input type="text" value = {this.state.descriptionValue} onChange={this.handleDescriptionChange} />
                        </label>
                        <input type="submit" value="Add Note" />
                    </form>
                </div>
                <div className="content">
                    {this.props.data.map((item)=> (
                        <Note data = {item} key = {item.id} updateNotes={this.props.updateNotes}/>
                    ))}
                </div>
            </div>



        );
    }
}

export default Content;