import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator, Text} from 'react-native';

const Loader = ({
  actionType = 'Loading',
  isLoading = false
}: {
  actionType: string;
  isLoading: boolean;
}) => {
  return (
    <Modal transparent={true} animationType={'none'} visible={isLoading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size="large"
            color="#28575F"
            animating={isLoading}
          />
          <Text>{actionType}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 150,
    width: 150,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;
