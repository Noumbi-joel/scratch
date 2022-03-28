import React from "react";
import { View, Text, Stylesheet } from "react-native";

//expo-av
import { Video } from "expo-av";

const Video = (props) => {
  return (
    <View>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 250,
  },
});

export default Video;
