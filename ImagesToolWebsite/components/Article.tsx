import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ArticleProps {
  article: {
    title: string;
    content: string[];
    keywords: string[];
  };
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`article-container card ${isVisible ? 'is-visible' : ''}`}
      id="about"
    >
      <h2>{article.title}</h2>
      {article.content.map((paragraph: string, index: number) => (
        <p key={index}>
          {paragraph}
        </p>
      ))}
      <div>
        <h3>Keywords:</h3>
        <div className="keywords-container">
          {article.keywords.map((keyword: string) => (
            <span key={keyword} className="keyword-chip">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Article;
