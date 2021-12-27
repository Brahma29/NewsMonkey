import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {

  const [articles, setarticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
    // document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;

  const updateNews = async()=> {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d6f9ba1b5bc440f68b5f29f9bea5836a&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setarticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [])

  // const handleNextClick = async () => {
  //   setPage(page + 1)
  //   updateNews();
  // };

  // const handlePrevClick = async () => {
  //   setPage(page-1)
  //   updateNews();
  // };

  const fetchMoreData = async() => {
    
    setPage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d6f9ba1b5bc440f68b5f29f9bea5836a&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setarticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  
  };
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
          NewsMonkey -Top Headlines from {capitalizeFirstLetter(props.category)} category
        </h2>
        {loading && <Spinner />}
        <div className="row">
          {articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreData}
      hasMore={articles.length !== totalResults}
      loader={<Spinner/>}
    ></InfiniteScroll>
        {/* <div className="container d-flex justify-content-evenly">
          <button
            type="button"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
            className="btn btn-dark"
          >
            &#8592;Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            onClick={this.handleNextClick}
            className="btn btn-dark"
          >
            Next&#8594;
          </button>
        </div> */}
      </div>
      
    );

 }
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;
