import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  render() {
    return (
      <div className="container my-2">
        <div className="row">
          <div className="col-md-4">
            <NewsItem item="title 1" description="description1" />
          </div>
          <div className="col-md-4">
            <NewsItem item="title 1" description="description1" />
          </div>
          <div className="col-md-4">
            <NewsItem item="title 1" description="description1" />
          </div>
        </div>
      </div>
    );
  }
}
