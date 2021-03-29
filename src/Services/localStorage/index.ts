import AsyncStorage from '@react-native-async-storage/async-storage';
import {post} from '../../Types';

const STORE_KEY = '@posts';

export const setLocalStoragePosts = async (posts: post[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('error saving posts in local storage', error);
  }
};

export const getLocalStoragePosts = async (): Promise<post[] | undefined> => {
  try {
    const posts = await AsyncStorage.getItem(STORE_KEY);
    return posts != null ? JSON.parse(posts) : null;
  } catch (error) {
    console.error('error getting posts from local storage', error);
  }
};
