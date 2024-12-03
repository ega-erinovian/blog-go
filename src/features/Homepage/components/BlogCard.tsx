import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { FC } from "react";

interface BlogCardInterface {
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  createdAt: Date;
}

const BlogCard: FC<BlogCardInterface> = ({
  title,
  description,
  thumbnail,
  author,
  createdAt,
}) => {
  return (
    <Card className="w-[350px]">
      <div className="relative w-full h-[280px]">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover rounded-lg rounded-b-none object-top"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <p className="text-gray-400 text-sm font-semibold">{author}</p>
        <p className="text-gray-400 text-sm font-semibold">
          {createdAt.toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
