import React, { Component } from 'react';
import BlogList from '../BlogList';

export default class BlogMain extends Component {
    render() {
        return (
            <>
                <div className="blog-main">
                    <h1>Latest Stories: </h1>
                    <BlogList />
                </div>
            </>
        );
    }
}