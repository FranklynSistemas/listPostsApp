import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';

import Loader from '../PresentationComponents/loader';
import PostView from '../PresentationComponents/postView';

import {usePostsContext} from '../Providers/Posts';
import {post as postType, user as userType, comment} from '../Types';

type Params = {
  postId?: number;
};

type Route = {
  params: Params;
};

const Post = ({route}: {route: Route}) => {
  const {
    params: {postId}
  } = route;
  const [isLoading, setIsLoading] = useState(false);
  const [actionType, setActionType] = useState('Loading');

  const {store, loadPost, markAsRead} = usePostsContext();

  const {
    post,
    user,
    comments
  }: {
    post: postType | {};
    user: userType | {};
    comments: comment[] | [];
  } = store;

  const initialize = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setActionType('Getting post');
      await loadPost(postId);
      await markAsRead(postId);
      setIsLoading(false);
    } catch (error) {
      // Show some error
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <SafeAreaView>
      <PostView post={post} user={user} comments={comments} />
      <Loader isLoading={isLoading} actionType={actionType} />
    </SafeAreaView>
  );
};

export default Post;
