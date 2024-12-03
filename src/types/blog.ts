type Blog = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  userId: number;
  user: {
    id: Number;
    username: string;
  };
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
