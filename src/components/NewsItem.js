import React, { Component } from "react";
import DummyNewsImage from "../Image/dummy_news_image.jpg";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="card text-center">
        <img
          src={imageUrl.length ? imageUrl : DummyNewsImage}
          className="card-img-top"
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">
            {title}
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style={{ left: "84%", zIndex: 1 }}
            >
              {source}
            </span>
          </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author}, on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary"
          >
            Read more
          </a>
        </div>
      </div>
    );
  }
}
