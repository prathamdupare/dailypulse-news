"use client";
import React, { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Button } from "./ui/button";
import CreateUser from "@/lib/actions/UserActions";
import { useRouter } from "next/navigation";

interface Props {
  user: {
    userId: string;
    username: string;
    image: string;
    isRegistered: true;
  };
}
const Prefrences = ({ user }: Props) => {
  const router = useRouter();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleToggle = (value: string) => {
    // Check if the value is already selected
    if (selectedValues.includes(value)) {
      // If yes, remove it from the array
      setSelectedValues(selectedValues.filter((item) => item !== value));
    } else {
      // If not, add it to the array
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleSubmit = async () => {
    await CreateUser({
      userId: user.userId,
      username: user.username,
      image: user.image,
      isRegistered: user.isRegistered,
      choices: selectedValues, // Assuming selectedValues is an array of choices
    });
    router.push("/");
  };

  return (
    <div>
      <p className="my-8 font-bold text-center">
        Select your favorite topics or news categories to personalize your
        newsfeed.
      </p>
      <ToggleGroup
        variant="outline"
        size={"lg"}
        type="multiple"
        className="flex-wrap"
      >
        <ToggleGroupItem
          value="general"
          aria-label="General"
          onClick={() => handleToggle("general")}
        >
          General
        </ToggleGroupItem>
        <ToggleGroupItem
          value="business"
          aria-label="Business"
          onClick={() => handleToggle("business")}
        >
          Business
        </ToggleGroupItem>
        <ToggleGroupItem
          value="technology"
          aria-label="Techonology"
          onClick={() => handleToggle("technology")}
        >
          Techonology
        </ToggleGroupItem>
        <ToggleGroupItem
          value="entertainment"
          aria-label="entertainment"
          onClick={() => handleToggle("entertainment")}
        >
          Entertainment
        </ToggleGroupItem>
        <ToggleGroupItem
          value="health"
          aria-label="entertainment"
          onClick={() => handleToggle("health")}
        >
          Health
        </ToggleGroupItem>
        <ToggleGroupItem
          value="science"
          aria-label="entertainment"
          onClick={() => handleToggle("science")}
        >
          Science
        </ToggleGroupItem>
        <ToggleGroupItem
          value="sports"
          aria-label="entertainment"
          onClick={() => handleToggle("sports")}
        >
          Sports
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="flex items-center justify-center mt-10">
        <Button disabled={selectedValues.length === 0} onClick={handleSubmit}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Prefrences;
