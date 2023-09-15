import React from "react";
import { Link } from "react-router-dom";

const ArticlesList = ({ articles }) => {
  return (
    <div>
      {articles.map((article, key) => (
        <Link
          className="article-list-item"
          to={`/articles/${article.name}`}
          key={article.name}
        >
          <h3>{article.title}</h3>
          <p>{article.content[0].substring(0, 150)}...</p>
        </Link>
      ))}
    </div>
  );
};

export default ArticlesList;