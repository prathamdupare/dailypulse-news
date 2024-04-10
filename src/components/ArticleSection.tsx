"use client";
import ArticleCard from "./cards/ArticleCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense, useState, useEffect } from "react";
import getData from "@/lib/getData";
import { SkeletonCard } from "./cards/SkeletonCard";
import { ScrollArea } from "./ui/scroll-area";

const ArticleSection = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        console.log("Fetched data", response); // Log the fetched data
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <div>Loading Latest News and AI Summary..</div>
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div>
      <Tabs defaultValue="articles" className="">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="summary">AI Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="articles" className="">
          <ArticleCard articles={data.response} />
        </TabsContent>
        <TabsContent value="summary" className="h-[700px]">
          <ScrollArea className="h-full w-full rounded-md border p-4">
            {data.newResponse.map((item, index) => {
              if (typeof item === "string") {
                // Remove occurrences of "\n\n" and "*"
                const cleanedItem = item.replace(/\\n*/g, "");
                // Render the cleaned string
                return (
                  <React.Fragment key={index}>{cleanedItem}</React.Fragment>
                );
              } else {
                // Render React elements directly
                return <React.Fragment key={index}>{item}</React.Fragment>;
              }
            })}{" "}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArticleSection;
