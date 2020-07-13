import React, { Component } from 'react';
import axios from 'axios'
import Article from '../Article/Article'
import './Articles.css'

const API_URL = 'https://content-store.explore.bfi.digital/api'

class SectionArticles extends Component {
  state = {
    data: [],
    per: 3,
    page: 1,
    total_pages: null,
    scrolling: false
  }

  getArticles = async function () {
    try {
      let page = this.state.page
      let type = this.props.type
      let url
      if (type) {
        url = API_URL + '/articles?type=' + type + '&page=' + page
      } else {
        url = API_URL + '/articles?page=' + page
      }
      const response = await axios.get(url)
      this.setState({
        data: [...this.state.data, ...response.data.data],
        total_pages: response.data.meta.total,
        scrolling: false
      })
    }
    catch (error) {
      console.log(error)
    }
  }
  componentDidMount() {
    this.getArticles();
    this.scrollListener = window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      }),
      this.getArticles
    );
  };

  handleScroll = (e) => {
    e.preventDefault()
    const lastLi = document.querySelector("div.archive > article:last-child");
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastLiOffset) {
      this.loadMore();
    }
  };

  render() {
    return (
      <div className="articles-wrapper">
        <div className="page">
          <h2 className="page-title">{this.props.title}</h2>
          <div className="archive">
            {this.state.data.map(article => (
              <Article key={article.uuid} info={article} />
            ))}
          </div>

        </div></div>
    )
  }
}

export default SectionArticles