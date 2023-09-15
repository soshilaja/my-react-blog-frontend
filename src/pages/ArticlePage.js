import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import articles from "./ArticleContent";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };

    if (!isLoading) {
      loadArticleInfo();
    }

    // setArticleInfo({ upvotes: 3, comments:[] });
  }, [articleId, user, isLoading]);

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(
      `/api/articles/${articleId}/upvote`,
      null,
      { headers }
    );
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  if (!article) return <NotFoundPage />;
  return (
    <div>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        <p>This article has {articleInfo.upvotes} upvotes(s)</p>
        {user ? (
          <button onClick={addUpvote}>
            {canUpvote ? "Upvote" : "Already upvoted"}
          </button>
        ) : (
          <button>Login to upvote</button>
        )}
      </div>

      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleId={articleId}
          onArticleUpdated={setArticleInfo}
        />
      ) : (
        <button>Login to add a comment</button>
      )}
      <CommentsList comments={articleInfo.comments} />
    </div>
  );
};

export default ArticlePage;
