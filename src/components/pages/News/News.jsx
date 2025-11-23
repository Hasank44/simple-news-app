import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Theme } from "../../../Context/ThemeProvider";

const News = ({ country, category, news, setNews }) => {
    const { theme } = useContext(Theme);
    const api_key = import.meta.env.VITE_NEWS_API;
    const [loading, setLoading] = useState(true);

    const getAllNews = async () => {
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${api_key}`
            );
            setNews(response.data.articles);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllNews();
    }, [country, category]);
    if (loading) return <div>Loading news...</div>;

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Latest News</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow">
                        {item.urlToImage && (
                            <img
                                src={item.urlToImage}
                                alt={item.title}
                                className="w-full h-40 object-cover rounded"
                            />
                        )}
                        <h2 className="font-semibold mt-2">{item.title}</h2>
                        <p className={`text-sm transition-colors duration-100 ${ theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.description}</p>
                        <a
                            href={item.url}
                            target="_blank"
                            className="text-blue-600 mt-2 inline-block"
                        >
                            Read more →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;