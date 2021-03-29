import React from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
  View,
  Platform,
  Dimensions
} from 'react-native';
import {ListItem, Icon, ButtonGroup, Button} from 'react-native-elements';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {post as postType} from '../Types';

const AnimatedView = Animated.createAnimatedComponent(View);
const width = Dimensions.get('window').width;

const PostsList = ({
  posts,
  onDeleteAllPosts,
  deletePost,
  showPost,
  selectedFilter,
  onChangeFilter
}: {
  posts: postType[];
  deletePost: (postId: number) => void;
  onDeleteAllPosts: () => void;
  showPost: (postId: number) => void;
  selectedFilter: number;
  onChangeFilter: (index: number) => void;
}) => {
  const references: any = {};

  const onDelete = async (postId: number) => {
    references[postId]?.close();
    deletePost(postId);
  };

  const renderLeftActions = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    return (
      <RectButton style={styles.leftAction}>
        <AnimatedView style={[styles.actionIcon, {transform: [{scale}]}]}>
          <Icon name="trash" type="evilicon" color="#ffffff" size={50} />
        </AnimatedView>
      </RectButton>
    );
  };

  const getFooterButton = () => {
    if (Platform.OS === 'android') {
      return (
        <Button
          buttonStyle={styles.circleDeleteButton}
          containerStyle={styles.circleDeleteButtonContainer}
          icon={<Icon name="trash" type="evilicon" color="#ffffff" size={40} />}
          onPress={() => onDeleteAllPosts()}
          raised
        />
      );
    }
    return (
      <Button
        buttonStyle={styles.deleteButton}
        containerStyle={styles.deleteButtonContainer}
        onPress={() => onDeleteAllPosts()}
        title="Delete All"
        raised
      />
    );
  };

  return (
    <View style={styles.container}>
      <ButtonGroup
        onPress={onChangeFilter}
        selectedIndex={selectedFilter}
        buttons={['All', 'Favorites']}
        containerStyle={{height: 40}}
      />
      <ScrollView style={styles.scrollView}>
        {posts.map((post: postType, idx: number) => {
          return (
            <Swipeable
              ref={(ref: Swipeable) => (references[post.id] = ref)}
              key={idx}
              renderLeftActions={renderLeftActions}
              onSwipeableLeftOpen={() => onDelete(post.id)}>
              <ListItem bottomDivider>
                {post.favorite && (
                  <Icon name="star" type="evilicon" color="#fafa00" />
                )}
                {post.read === false && (
                  <Icon name="circle" type="font-awesome" color="#00abfa" />
                )}
                <ListItem.Content>
                  <ListItem.Title>{post.title}</ListItem.Title>
                </ListItem.Content>
                <TouchableOpacity onPress={() => showPost(post.id)}>
                  <ListItem.Chevron size={40} />
                </TouchableOpacity>
              </ListItem>
            </Swipeable>
          );
        })}
      </ScrollView>
      {getFooterButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    marginBottom: Platform.OS === 'android' ? 0 : 70
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#ff2929',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
  },
  actionIcon: {
    width: 50,
    marginHorizontal: 10,
    height: 50
  },
  deleteButtonContainer: {
    bottom: 10,
    position: 'absolute',
    height: 60,
    width: width
  },
  deleteButton: {
    backgroundColor: '#ff2929',
    height: 60
  },
  circleDeleteButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 60,
    width: 60,
    borderRadius: 50
  },
  circleDeleteButton: {
    backgroundColor: '#ff2929',
    height: 60,
    width: 60,
    borderRadius: 50
  }
});

export default PostsList;
