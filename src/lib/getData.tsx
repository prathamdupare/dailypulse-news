"use server";
import { currentUser } from "@clerk/nextjs";
import fetchData from "./gemini/api";
import fetchTopic from "./news-api/fetch";
import { fetchUser } from "./actions/UserActions";
import { createClient } from "redis";
import React from "react";

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
      console.log(combinedResponse);
    } catch (error) {
      console.error(`Error fetching topic  "${choice}":`, error);
    }
  }

  // Process combined response
  try {
    console.log("Starting fetching data for combined articles from Gemini");

    let story;
    story = await fetchData({ text: JSON.stringify(combinedResponse) });
    console.log("Successfully got result from Gemini", story);

    // Cache the combined articles in Redis

    console.log(story);
    let responseArray = story.split("**").flatMap((str) => str.split("\n"));

    let newResponse = [];

    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 0) {
        newResponse.push(responseArray[i]);
      } else {
        newResponse.push(
          <React.Fragment key={i}>
            <br />
            <strong>{responseArray[i].replace(/\\n/g, "")}</strong>
            <br />
          </React.Fragment>,
        );
      }
    }

    console.log("this is combo resp", newResponse);
    return { response: combinedResponse, newResponse };
  } catch (error) {
    console.log("Error fetching fetchData");
  }
}
