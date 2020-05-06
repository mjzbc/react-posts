import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';


class FullPost extends Component {

    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        // only send get request if id is not null
        if(this.props.id){
            // check if don't have a loaded post
            // or if already loaded a post and if ID does not match it, to prevent infinite loop
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){
                axios.get('/posts/' + this.props.id)
                    .then( response => {
                        this.setState({loadedPost: response.data});
                    });
            }
        }        
    }

    deletePostHandler = (id) => {
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log(response);
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a post to load...</p>;
        // check for which post to show if one is clicked
        if(this.props.id){
            post = <p style={{textAlign:'center'}}>Loading...</p>;
        }
        // post has been loaded
        if(this.state.loadedPost){
            post = (
                    <div className="FullPost">
                        <h1>{this.state.loadedPost.title}</h1>
                        <p>{this.state.loadedPost.body}</p>
                        <div className="Edit">
                            <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                        </div>
                    </div>
            );
            
        };
        return post;
    }
 
}

export default FullPost;