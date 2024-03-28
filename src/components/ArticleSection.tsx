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
    return (
      <div className="flex flex-col gap-3">
        <div>Loading Your News and AI Summary...</div>
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
        <TabsContent value="articles" className="h-[800px]">
          <ScrollArea className="h-full w-full rounded-md border p-4">
            <ArticleCard articles={data.response} />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="summary" className="h-[700px]">
          <ScrollArea className="h-full w-full rounded-md border p-4">
            {data.newResponse.map((item, index) => (
              <React.Fragment key={index}>{item}</React.Fragment>
            ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArticleSection;
