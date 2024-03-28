"use server";
import { currentUser } from "@clerk/nextjs";
import fetchData from "./gemini/api";
import fetchTopic from "./news-api/fetch";
import { fetchUser } from "./actions/UserActions";

export default async function getData() {
  const user = await currentUser();
  const fetchedUser = await fetchUser(user.id);
  const userChoices = fetchedUser.choices;

  const response = await fetchTopic("technology");

  const story = await fetchData({ text: JSON.stringify(response) });
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

  return { response, newResponse };
}
