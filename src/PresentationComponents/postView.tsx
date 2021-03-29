import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import {
  post as postType,
  user as userType,
  comment as commentType
} from '../Types';

const PostView = ({
  post,
  user,
  comments
}: {
  post: postType | {};
  user: userType | {};
  comments: commentType[] | [];
}) => {
  const userFields = ['Name', 'Email', 'Phone', 'Website'];
  return (
    <ScrollView>
      <Card>
        <Card.Title>Description</Card.Title>
        <Card.Divider />
        <View>
          <Text>{post?.body}</Text>
        </View>
      </Card>
      <Card>
        <Card.Title>User</Card.Title>
        <Card.Divider />
        <View>
          {userFields.map((field, idx) => (
            <Text key={idx}>
              {field}: {user[field.toLowerCase()]}
            </Text>
          ))}
        </View>
      </Card>
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        {comments.map((comment: commentType, idx: number) => (
          <ListItem bottomDivider key={idx}>
            <ListItem.Content>
              <ListItem.Title>{comment?.name}</ListItem.Title>
              <Text>{comment?.body}</Text>
            </ListItem.Content>
          </ListItem>
        ))}
      </Card>
    </ScrollView>
  );
};

export default PostView;
