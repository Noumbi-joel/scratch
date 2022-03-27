import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

//svg
import { SvgXml } from "react-native-svg";

const CookingMode = (props) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Text>Cooking Mode</Text>
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
  container: {
    flex: 1,
  },
  video: {
    width: 250,
    height: 250,
  },
});

export default CookingMode;
