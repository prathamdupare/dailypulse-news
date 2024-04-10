import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
const ArticleCard = ({ articles }) => {
  return (
    <div>
      <div className="grid gap-4 ">
        <div className="flex gap-2 flex-wrap">
          {articles.map((article, index) => (
            <Card className="w-full md:w-[400px] md:min-h-[300px]" key={index}>
              <div>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                  <p>
                    <span className="font-bold">Author(s) :</span>{" "}
                    {article.author}
                  </p>

                  <p className="text-gray-300">{article.publishedAt}</p>

                  <Link className="text-sm text-red-400" href={article.url}>
                    Read More..
                  </Link>
                </CardHeader>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
