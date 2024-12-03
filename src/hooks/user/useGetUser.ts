"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const useGetUser = (id: number) => {
  const [user, setUser] = useState<User[]>([]);

  const getUser = async (id: number) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/users/${id}`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser(id);
  }, []);

  return { user, getUser };
};

export default useGetUser;
