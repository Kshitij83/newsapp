import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({category}) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const url = `https://api.mediastack.com/v1/news?access_key=${
      import.meta.env.VITE_API_KEY2
    }&countries=in&categories=${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        if (data && data.data) {
          setArticles(data.data);
        } else {
          console.error("No articles found in response");
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {articles.length > 0 ? (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.image} 
            url={news.url}
          />
        ))
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
};

export default NewsBoard;
