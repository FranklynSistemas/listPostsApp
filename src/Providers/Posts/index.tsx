import React, {createContext, useContext} from 'react';
import usePosts from './usePosts';

import {initialPosts} from './reduce';

const DEFAULT_PROMISE = (param?: any) =>
  new Promise<void>(resolve => {
    resolve();
  });

export const PostsContext = createContext({
  store: initialPosts,
  loadPosts: DEFAULT_PROMISE,
  deletePost: DEFAULT_PROMISE,
  loadPost: DEFAULT_PROMISE,
  markAsRead: DEFAULT_PROMISE,
  markAsFavorite: DEFAULT_PROMISE,
  deleteAllPosts: DEFAULT_PROMISE
});

export const usePostsContext = () => {
  return useContext(PostsContext);
};

export const PostsProvider = (props: any) => {
  const posts = usePosts();
  return (
    <PostsContext.Provider value={posts}>
      {props.children}
    </PostsContext.Provider>
  );
};
