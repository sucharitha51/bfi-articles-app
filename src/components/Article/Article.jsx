import React from 'react';
import './Article.css'
import PropTypes from 'prop-types'

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const Article = ({ info }) => {
     let imageUrl, author, authorUrl
     if (info.primary_image) {
          if (info.primary_image.url) {
               imageUrl = info.primary_image.url
          } else if (info.primary_image.length > 1) {
               imageUrl = info.primary_image[1].url
          }
     }
     if (info.authors && info.authors.length > 0) {
          author = info.authors[0].name
          let authorId = info.authors[0].id
          authorUrl = '/author?authorId=' + authorId + '&authorName=' + author
     }
     return (
          <article className="article">
               <img className="image" src={imageUrl} alt="BFI news" width="425"></img>
               <div className="summary">
                    <h3><a target="blank" href={info.url}>{info.title}</a></h3>
                    {renderHTML(info.summary)}
                    {author ? <p>By <a href={authorUrl} >{author} </a></p> : ''}
               </div>
          </article>
     )
}

Article.propTypes = {
     title: PropTypes.string,
     summary: PropTypes.string,
     url: PropTypes.string,
     authors: PropTypes.array
}
export default Article
