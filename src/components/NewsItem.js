import React, { Component } from "react";

export default class NewsItem extends Component {

  render() {
    let {title, description} = this.props
    return (
      <div className="card" style={{width: '18rem'}}>
        <img src="https://screenshots.rtl.nl/system/thumb/sz=720x404/uuid=28c9c1ef-76ea-4059-be75-add1e79c6981" className="card-img-top" alt=""/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {description}
          </p>
          <a href="/" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    );
  }
}
