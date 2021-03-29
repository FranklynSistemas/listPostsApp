import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PostsProvider} from './src/Providers/Posts';
import RootStackScreen from './src';

const App = () => {
  return (
    <PostsProvider>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </PostsProvider>
  );
};

export default App;
