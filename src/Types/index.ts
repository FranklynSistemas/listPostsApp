export type post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  read?: boolean;
  favorite?: boolean;
};

export type geo = {
  lat: string;
  lng: string;
};

export type address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: geo;
};

export type company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type user = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: address;
  phone: string;
  website: string;
  company: company;
};

export type comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type stateType = {
  posts: post[] | any[];
  post: post | {};
  user: user | {};
  comments: comment[] | any[];
};

export type actionType = {
  type?: string;
  posts?: post[] | [];
  post?: post | {};
  user?: user | {};
  comments?: comment[] | [];
};
