import React, { Component } from 'react';
import axios from 'axios'
import Article from '../Article/Article'
import './Articles.css'

const API_URL = 'https://content-store.explore.bfi.digital/api'
class Articles extends Component {
    state = {
        articles: [],
        types: [],
        review: [],
        video: [],
        features: [],
        author: [],
        authorName: '',
    }

    getArticles = async () => {
        try {
            const articleTypes = await axios.get(API_URL + '/types')
            this.setState({ types: articleTypes.data.data })

            const response = await axios.get(API_URL + '/articles?size=3')
            this.setState({ articles: response.data.data })

            this.state.types.forEach(async (type) => {
                const response = await axios.get(API_URL + '/articles?type=' + type.id + '&size=3')
                this.setState({
                    [type.id]: response.data.data
                })
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    getAuthorDetails = async () => {
        const query = new URLSearchParams(
            this.props.location.search
        );
        let data = {};
        for (let params of query.entries()) {
            data[params[0]] = params[1];
        }
        this.setState({ authorName: data.authorName })
        axios.get(API_URL + '/articles?author=' + data.authorId)
            .then(response => {
                this.setState({ author: response.data.data })
            }
            )
    }

    componentDidMount() {
        if (this.props.location.pathname === '/') {
            this.getArticles()
        }

        if (this.props.location.pathname === '/author') {
            this.getAuthorDetails()
        }
    }

    getArticlesData = (title, data, path = '') => {
        return <>
            {path ? <h2><a href={path}>{title}</a></h2> : <h2 className="page-title">{title}</h2>}
            <div className="archive">
                {data.map(article => (
                    <Article key={article.uuid} info={article} />
                ))}
            </div></>
    }

    render() {
        const { articles, review, video, features, author, authorName } = this.state
        let articlesData

        switch (this.props.location.pathname) {
            case '/author':
                articlesData = this.getArticlesData(decodeURIComponent(authorName), author)
                break
            default:
                let articleData = this.getArticlesData('Latest', articles.slice(0, 3), '/latest')
                let reviewData = this.getArticlesData('Reviews', review.slice(0, 3), '/reviews')
                let videoData = this.getArticlesData('Videos', video.slice(0, 3), '/videos')
                let featuresData = this.getArticlesData('Features', features.slice(0, 3), '/features')
                return [articleData, reviewData, videoData, featuresData]
        }

        return (
            <div className="articles-wrapper">
                <div className="page">
                    {articlesData}
                </div>
            </div>
        )
    }
}
export default Articles