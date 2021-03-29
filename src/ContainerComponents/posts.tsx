import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import PostsList from '../PresentationComponents/postsList';
import Loader from '../PresentationComponents/loader';

import {usePostsContext} from '../Providers/Posts';

const Posts = ({navigation}: {navigation: any}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [actionType, setActionType] = useState('Loading');
  const [selectedFilter, setSelectedFilter] = useState(0);

  const {
    store: {posts},
    loadPosts,
    deletePost,
    deleteAllPosts
  } = usePostsContext();

  const onChangeFilter = (index: number) => {
    setSelectedFilter(index);
  };

  const showPost = (postId: number) => {
    navigation.navigate('PostScreen', {postId});
  };

  const onDeleteAllPosts = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setActionType('Deleting all posts');
      await deleteAllPosts();
      setIsLoading(false);
    } catch (error) {
      // Show some error
    }
  };

  const onDeletePost = async (postId: number): Promise<void> => {
    try {
      setIsLoading(true);
      setActionType('Deleting post');
      await deletePost(postId);
      setIsLoading(false);
    } catch (error) {
      // Show some error
    }
  };

  const initialize = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setActionType('Getting posts');
      await loadPosts();
      setIsLoading(false);
    } catch (error) {
      // Show some error
    }
  };

  useEffect(() => {
    initialize();
  }, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <PostsList
        posts={
          selectedFilter === 0 ? posts : posts.filter(({favorite}) => favorite)
        }
        onDeleteAllPosts={onDeleteAllPosts}
        deletePost={onDeletePost}
        showPost={showPost}
        selectedFilter={selectedFilter}
        onChangeFilter={onChangeFilter}
      />
      <Loader isLoading={isLoading} actionType={actionType} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
});

export default Posts;
