"use client";

import useGetBlogs from "@/hooks/blog/useGetBlogs";
import React from "react";
import BlogCard from "./BlogCard";

const BlogCards = () => {
  const { blogs } = useGetBlogs();
  console.log(blogs);

  return (
    <div className="mt-32 grid grid-cols-4">
      {blogs?.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          thumbnail={blog.thumbnail}
          description={blog.description}
          author={blog.user.username}
          createdAt={new Date(blog.createdAt)}
        />
      ))}
    </div>
  );
};

export default BlogCards;
