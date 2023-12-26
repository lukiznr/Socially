type User = {
  name: string;
  userName: string;
  picture: string | null;
};
type Picture = {
  url: string;
};
export type UserPostType = {
  id: string;
  userId: string;
  createdAt: string;
  Picture: Picture[] | null;
  content: string | null;
  author: User;
};
