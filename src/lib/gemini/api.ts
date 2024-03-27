const fetchData = async () => {
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
                  text: "Write a story about a magic backpack",
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

    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export default fetchData;
