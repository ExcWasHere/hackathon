import React, { useState, useEffect } from 'react';

const BusinessNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data to simulate API response
  const sampleData : any = [
    {
      title: "Revolutionizing Agriculture: The Rise of Vertical Farming",
      description: "As urbanization increases, vertical farming emerges as a sustainable solution to food production in cities.",
      url: "https://example.com/agriculture-news/1",
      img: "/news.png"
    },
  ];

  useEffect(() => {
    const fetchBusinessNews = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setArticles(sampleData);
        setLoading(false);
      } catch (error : any) {
        console.error('Error fetching business news:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBusinessNews();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-5">
        <div className="animate-pulse space-y-8">
          <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-5">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>Error fetching business news: {error}</p>
        </div>
      </div>
    );
  }

  const [topStory] = articles;

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Top Story */}
      {topStory && (
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={topStory.img} 
              alt={topStory.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {topStory.title}
              </h2>
              <p className="text-gray-600 mb-4">{topStory.description}</p>
              <a 
                href={topStory.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                Read Full Story
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessNews;