import React from "react";

import { StyleSheet } from "react-native";

//expo-av
import { Video, AVPlaybackStatus } from "expo-av";

const VideoPlayer = (props) => {
  return (
    <Video
      style={styles.video}
      source={{
        uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      }}
      useNativeControls
      resizeMode="contain"
      isLooping
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 250,
  },
});

export default VideoPlayer;
