"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const useGetBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/blogs");
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return { blogs, getBlogs };
};

export default useGetBlogs;
