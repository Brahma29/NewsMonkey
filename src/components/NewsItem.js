import React from "react";
// import PropTypes from "prop-types";
// import { getByTitle } from "@testing-library/react";

const NewsItem =(props)=> {

    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div>
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://www.thenewsminute.com/sites/default/files/iStock-1267716518.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}...
              <span
                className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                style={{ left: "85%", zIndex: "1" }}
              >
                {source}
              </span>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-danger">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank" rel="noreferrer"
              className="btn btn-sm btn btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }

export default NewsItem;
