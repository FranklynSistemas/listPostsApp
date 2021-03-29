import React, {useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';
import {Button, Icon} from 'react-native-elements';

import {usePostsContext} from './Providers/Posts';

import Posts from './ContainerComponents/posts';
import Post from './ContainerComponents/post';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  const [loading, setLoading] = useState(false);
  const {loadPosts, markAsFavorite} = usePostsContext();

  const reloadPosts = async () => {
    setLoading(true);
    const reload = true;
    await loadPosts(reload);
    setLoading(false);
  };

  const commonButtonsProps = {
    type: 'clear',
    loadingProps: {
      color: 'white',
      size: 'large'
    },
    loading
  };

  const reloadButton = () => (
    <Button
      {...commonButtonsProps}
      icon={<Icon name="redo" size={30} color="white" type="evilicon" />}
      onPress={reloadPosts}
    />
  );

  const addPostToFavorites = async (postId: number) => {
    setLoading(true);
    await markAsFavorite(postId);
    setLoading(false);
  };

  const addPostToFavoritesButton = (route: any) => {
    const {
      params: {postId}
    } = route;
    return (
      <Button
        {...commonButtonsProps}
        icon={<Icon name="star" size={30} color="white" type="evilicon" />}
        onPress={() => addPostToFavorites(postId)}
      />
    );
  };

  const getOptions = ({title, route}: {title: string; route: any}) => ({
    title,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerStyle: {
      backgroundColor: '#009de0',
      elevation: 0,
      shadowOpacity: 0
    },
    headerTitleStyle: {
      color: 'white'
    },
    headerBackTitleStyle: {
      tintColor: 'white',
      color: 'white'
    },
    headerTintColor: 'white',
    headerRight: () =>
      title === 'Posts' ? reloadButton() : addPostToFavoritesButton(route)
  });
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="PostsScreen"
        component={Posts}
        options={props => getOptions({...props, title: 'Posts'})}
      />
      <RootStack.Screen
        name="PostScreen"
        component={Post}
        options={props => getOptions({...props, title: 'Post'})}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
