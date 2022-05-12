import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=72638e89521642eeae6d41e5f196d221&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }

  handlePrevEvent = async () => {
    if (this.state.page > 1) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=72638e89521642eeae6d41e5f196d221&pageSize=${
        this.props.pageSize
      }&page=${this.state.page - 1}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page - 1,
        loading: false,
      });
    }
  };

  handleNextEvent = async () => {
    if (this.state.page <= Math.ceil(this.state.totalArticles / 10)) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=72638e89521642eeae6d41e5f196d221&pageSize=${
        this.props.pageSize
      }&page=${this.state.page + 1}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="container my-2">
        <h1>Top headlines...</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div key={element.url} className="col-md-4 my-2">
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage ? element.urlToImage : ""}
                    newsUrl={element.url}
                    author={element.author ? element.author : "unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between m-2 ">
          <button
            type="button"
            className="btn btn-info"
            onClick={this.handlePrevEvent}
            disabled={this.state.page <= 1}
          >
            &#60; Previous
          </button>
          <p>{this.state.page}</p>
          <button
            type="button"
            className="btn btn-info"
            onClick={this.handleNextEvent}
            disabled={
              this.state.page >= Math.ceil(this.state.totalArticles / 10)
            }
          >
            Next &#62;
          </button>
        </div>
        <br />
        <br />
      </div>
    );
  }
}
