import React, { Component } from 'react';
import './App.css';
import Header from "./Components/Header";
import Content from "./Components/Content";
import axios from "axios";

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: []
        }
        this.updateNotes = this.updateNotes.bind(this);
    }

    componentDidMount() {
        console.log('>> componentDidMount');
        axios.get('https://localhost:44335/api/Note')
            .then(response => this.setState({data: response.data})).then(response => console.log(response));
    }

    updateNotes(){
        let that = this;
        setTimeout(function(){
            console.log("in update notes")
            console.log('>> componentDidMount');
            axios.get('https://localhost:44335/api/Note')
                .then(response => that.setState({data: response.data}));
        }, 500);
        this.forceUpdate();
    }


  render() {
    console.log(this.state.data);
    return (
        <div className="app">
            <Header/>
            <Content data={this.state.data} updateNotes={this.updateNotes}/>
        </div>

    );
  }
}

export default App;
