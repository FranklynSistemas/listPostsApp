import {useReducer} from 'react';
import {reducer, initialPosts} from './reduce';
import {getPosts, getUser, getComments, deletePosts} from '../../Services/api';
import {
  getLocalStoragePosts,
  setLocalStoragePosts
} from '../../Services/localStorage';
import {post} from '../../Types';

const findPost = (postId: number, posts: post[]): post | undefined =>
  posts.find(({id}) => postId === id);
const filterPosts = (postId: number, posts: post[]): post[] =>
  posts.filter(({id}) => id !== postId);

const usePosts = () => {
  const [store, dispatch] = useReducer(reducer, initialPosts as never);

  const loadPosts = async (reload?: boolean): Promise<void> => {
    let postsList = reload ? null : await getLocalStoragePosts();
    if (!postsList) {
      const postsResult = await getPosts();
      postsList = postsResult?.map((_post: post, idx: number) => {
        return {
          ..._post,
          key: idx,
          read: idx < 20 ? false : undefined,
          favorite: false
        };
      });
      await setLocalStoragePosts(postsList || []);
    }
    dispatch({type: 'LOAD_POSTS', posts: postsList});
  };

  const loadPost = async (postId: number): Promise<void> => {
    let _post;
    const postsList = await getLocalStoragePosts();
    if (postsList) {
      _post = findPost(postId, postsList);
    } else {
      _post = await getPosts(postId);
    }
    const user = await getUser(_post.userId);
    const comments = await getComments(postId);
    dispatch({type: 'LOAD_POST', post: _post, user: user[0], comments});
  };

  const deletePost = async (postId: number): Promise<void> => {
    const result = await deletePosts(postId);
    if (result) {
      const postsList = await getLocalStoragePosts();
      if (postsList) {
        await setLocalStoragePosts(filterPosts(postId, postsList) || []);
      }
      await loadPosts();
    }
  };

  const deleteAllPosts = async (): Promise<void> => {
    await setLocalStoragePosts([]);
    await loadPosts();
  };

  const markAsRead = async (postId: number): Promise<void> => {
    const postsList = await getLocalStoragePosts();
    await setLocalStoragePosts(
      postsList?.map(_post => {
        let postToUpdate = _post;
        if (_post.id === postId) {
          postToUpdate = {
            ..._post,
            read: true
          };
        }
        return postToUpdate;
      }) || []
    );
    await loadPosts();
  };

  const markAsFavorite = async (postId: number): Promise<void> => {
    const postsList = await getLocalStoragePosts();
    await setLocalStoragePosts(
      postsList?.map(_post => {
        let postToUpdate = _post;
        if (_post.id === postId) {
          postToUpdate = {
            ..._post,
            favorite: true
          };
        }
        return postToUpdate;
      }) || []
    );
    await loadPosts();
  };

  return {
    store,
    loadPosts,
    loadPost,
    deletePost,
    deleteAllPosts,
    markAsRead,
    markAsFavorite
  };
};

export default usePosts;
