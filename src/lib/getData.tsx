"use server";
import { currentUser } from "@clerk/nextjs";
import fetchData from "./gemini/api";
import fetchTopic from "./news-api/fetch";
import { fetchUser } from "./actions/UserActions";

export default async function getData() {
  const user = await currentUser();
  const fetchedUser = await fetchUser(user.id);
  const userChoices = fetchedUser.choices;

  let combinedResponse = [];

  // Fetch topics for each user choice and combine responses
  for (const choice of userChoices) {
    try {
      const response = await fetchTopic(choice);
      combinedResponse = combinedResponse.concat(response);
    } catch (error) {
      console.error(`Error fetching topic "${choice}":`, error);
    }
  }

  // Process combined response
  const story = await fetchData({ text: JSON.stringify(combinedResponse) });
  let responseArray = story.split("**");
  let newResponse = [];

  for (let i = 0; i < responseArray.length; i++) {
    if (i === 0 || i % 2 !== 1) {
      newResponse.push(responseArray[i]);
    } else {
      newResponse.push(<br />);
      newResponse.push(<strong>{responseArray[i]}</strong>);
      newResponse.push(<br />);
    }
  }

  return { response: combinedResponse, newResponse };
}
