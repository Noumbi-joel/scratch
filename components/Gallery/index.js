import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Gallery = (props) => {
  if (props.horizontal) {
    return (
      <View style={styles.horizontalContainer}>
        <ImageBackground
          imageStyle={{ borderRadius: 50 }}
          source={props.images}
          resizeMode="cover"
          style={styles.roundedImg}
        />
        <ImageBackground
          imageStyle={{ borderRadius: 50 }}
          source={props.images}
          resizeMode="cover"
          style={styles.roundedImg}
        />
        <ImageBackground
          imageStyle={{ borderRadius: 50 }}
          source={props.images}
          resizeMode="cover"
          style={styles.roundedImg}
        />
        <View style={styles.multiImg}>
          <Text
            style={[
              styles.textMultiImg,
              { color: props.colors.black, paddingTop: 20 },
            ]}
          >
            5+
          </Text>
          <ImageBackground
            source={props.images}
            resizeMode="cover"
            imageStyle={{ borderRadius: 50 }}
            style={styles.roundedImg}
          />
        </View>
        <Text style={[styles.ingList, { color: props.colors.black }]}>
          Lemonade, coconut, peppers, egg + 5 more
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={props.images}
        resizeMode="cover"
        style={styles.topBg}
      />
      <View style={styles.downBgs}>
        <ImageBackground
          source={props.images}
          resizeMode="cover"
          style={styles.downBg}
        />
        <ImageBackground
          source={props.images}
          resizeMode="cover"
          style={styles.downBg}
        />
        <View style={styles.multiImg}>
          <Text style={[styles.textMultiImg, { color: props.colors.black }]}>
            12+
          </Text>
          <ImageBackground
            source={props.images}
            resizeMode="cover"
            style={styles.downBg}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  topBg: { width: "100%", height: 125 },
  roundedImg: { width: 60, height: 60 },
  downBgs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ingList: {
    marginVertical: 10,
    fontSize: 12,
  },
  downBg: {
    width: 95,
    height: 95,
    marginTop: 10,
    fontWeight: "400",
  },
  multiImg: {
    position: "relative",
    alignItems: "center",
    overflow: "hidden",
  },
  textMultiImg: {
    fontSize: 16,
    fontWeight: "700",
    position: "absolute",
    zIndex: 99,
    width: "100%",
    height: "100%",
    textAlign: "center",
    paddingTop: 45,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  horizontalContainer: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
  },
});

export default Gallery;
