import React from "react";
import ArticlesList from "../components/ArticlesList";
import articles from "./ArticleContent";

const ArticlesListPage = () => {
  return (
    <div>
      <h1>Articles</h1>
      <ArticlesList articles={articles} />
    </div>
  );
};

export default ArticlesListPage;
