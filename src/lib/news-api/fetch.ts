const NewsAPI = require("newsapi");

const fetchTopic = async (topic: string) => {
  try {
    const apiResponse = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=10`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
        },
      },
    );

    const json = await apiResponse.json();
    return json.articles;
  } catch (error) {
    console.log(`Error fetching news, ${error}`);
  }
};

export default fetchTopic;
