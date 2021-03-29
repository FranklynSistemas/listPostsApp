import axios from 'axios';
import {appConfig} from '../../Config';

const apiClient = axios.create({
  baseURL: appConfig.apiUrl,
  headers: {'Content-Type': 'application/json'}
});

export const getPosts = async (postId?: number) => {
  try {
    const path = postId ? `/posts/${postId}` : '/posts';
    const response = await apiClient.get(path);
    return response.data;
  } catch (error) {
    console.log('Error getting posts', error);
    throw error;
  }
};

export const getComments = async (postId: number) => {
  try {
    const response = await apiClient.get(`/comments?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.log('Error getting comments', error);
    throw error;
  }
};

export const getUser = async (userId: number) => {
  try {
    const response = await apiClient.get(`/users?id=${userId}`);
    return response.data;
  } catch (error) {
    console.log('Error getting users info', error);
    throw error;
  }
};

export const deletePosts = async (postId?: number) => {
  try {
    const path = postId ? `/posts/${postId}` : '/posts';
    const response = await apiClient.delete(path);
    return response.data;
  } catch (error) {
    console.log('Error deleting posts', error);
    throw error;
  }
};
