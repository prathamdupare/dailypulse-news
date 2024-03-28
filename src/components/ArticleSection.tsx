import { fetchUser } from "@/lib/actions/UserActions";
import fetchTopic from "@/lib/news-api/fetch";
import { currentUser } from "@clerk/nextjs";
import ArticleCard from "./cards/ArticleCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import fetchData from "@/lib/gemini/api";
import React from "react";

const ArticleSection = async () => {
  try {
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

    return (
      <div>
        <Tabs defaultValue="articles" className="">
          <TabsList>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="summary">AI Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="articles">
            <ArticleCard articles={response} />
          </TabsContent>
          <TabsContent value="summary">
            AI will generate the summary here.
            {newResponse.map((item, index) => (
              <React.Fragment key={index}>{item}</React.Fragment>
            ))}{" "}
          </TabsContent>
        </Tabs>
      </div>
    );
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null; // or any other error handling logic
  }
};

export default ArticleSection;
