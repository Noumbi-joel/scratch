import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

//navigation container
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ******* screens ******** //
//Login Stack
import Login from "../screens/Auth/Login"
import SignUp from "../screens/Auth/SignUp"

//MyFilesStack

//MeStack

//images
import loginBg from "../assets/png/login-bg.png"

//colors
import colors from "../utils/colors";

const appTheme = {
  colors: {
    background: colors.white,
  },
};

const LoginStack = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="login"
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
    </Stack.Navigator>
  );
};

const MeStack = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="me"
    >
      <Stack.Screen name="me" component={MeScreen} />
    </Stack.Navigator>
  );
};

const AppTabs = (props) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name=""
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => <Image source={null} />,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginStack} />
        {/* <Stack.Screen name="Tabs" component={AppTabs} />
        <Stack.Screen name="HomeStack" component={HomeStack} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default AppNavigator;
