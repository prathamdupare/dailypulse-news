const fetchData = async ({ text }: string) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Give me summary of these articles: ${text}`,
                },
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    const story = data.candidates[0].content.parts[0].text;
    return story;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export default fetchData;
