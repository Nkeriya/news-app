import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
// import NextPrevButton from "./NextPrevButton";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - News`;
  }

  componentDidMount() {
    this.updateNewsCard(this.state.page);
  }

  async updateNewsCard(page) {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=72638e89521642eeae6d41e5f196d221&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // handlePrevEvent = () => {
  //   let pagev = this.state.page - 1;
  //   this.setState({
  //     page: pagev,
  //   });
  //   this.updateNewsCard(pagev);
  // };

  // handleNextEvent = () => {
  //   let pagev = this.state.page + 1;
  //   this.setState({
  //     page: pagev,
  //   });
  //   this.updateNewsCard(pagev);
  // };

  fetchMoreData = async () => {
    let pagev = this.state.page + 1;
    this.setState({ page: pagev });

    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=72638e89521642eeae6d41e5f196d221&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${pagev}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center m-4">Top headlines...</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div key={element.url} className="col-md-4 my-2">
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
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
          </div>
        </InfiniteScroll>
        {/* <NextPrevButton
          prevClickedEvent={this.handlePrevEvent}
          nextClickedEvent={this.handleNextEvent}
          disablePrev={this.state.page <= 1}
          disableNext={
            this.state.page >= Math.ceil(this.state.totalResults / 10)
          }
          pageNumber={this.state.page}
        /> */}
      </>
    );
  }
}
