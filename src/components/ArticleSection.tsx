"use client";
import ArticleCard from "./cards/ArticleCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense, useState, useEffect } from "react";
import getData from "@/lib/getData";
import { SkeletonCard } from "./cards/SkeletonCard";

const ArticleSection = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        console.log("Fetched data:", response); // Log the fetched data
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function (optional)
    return () => {
      // Perform cleanup here if needed
    };
  }, []);

  if (loading) {
    return <SkeletonCard />;
  }

  return (
    <div>
      <Tabs defaultValue="articles" className="">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="summary">AI Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <ArticleCard articles={data.response} />
        </TabsContent>
        <TabsContent value="summary">
          AI will generate the summary here.
          {data.newResponse.map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArticleSection;
