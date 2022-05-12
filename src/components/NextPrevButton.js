import React, { Component } from "react";

export default class NextPrevButton extends Component {
  render() {
    let {
      prevClickedEvent,
      nextClickedEvent,
      disablePrev,
      disableNext,
      pageNumber,
    } = this.props;
    return (
      <>
        <div className="container d-flex justify-content-between m-2 ">
          <button
            type="button"
            className="btn btn-info"
            onClick={prevClickedEvent}
            disabled={disablePrev}
          >
            &#60; Previous
          </button>
          <p>{pageNumber}</p>
          <button
            type="button"
            className="btn btn-info"
            onClick={nextClickedEvent}
            disabled={disableNext}
          >
            Next &#62;
          </button>
        </div>
        <br />
        <br />
      </>
    );
  }
}
