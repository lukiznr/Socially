type User = {
  name: string;
  userName: string;
  picture: string | null;
};

export type UserPostType = {
  id: string;
  userId: string;
  createdAt: string;
  picture: string | null;
  content: string | null;
  user: User;
};

