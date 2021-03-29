import {stateType, actionType} from '../../Types';

export const initialPosts = {
  posts: [] as any[],
  post: {},
  user: {},
  comments: [] as any[]
};

export const reducer = (
  state: stateType = initialPosts,
  action: actionType = {}
) => {
  switch (action.type) {
    case 'LOAD_POSTS':
      return {
        ...state,
        posts: action.posts
      };
    case 'LOAD_POST':
      return {
        ...state,
        post: action.post,
        user: action.user,
        comments: action.comments
      };
    default:
      return state;
  }
};
