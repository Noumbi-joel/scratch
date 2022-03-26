import React from "react";
import { StyleSheet, Image, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

//svg xml
import { SvgXml } from "react-native-svg";

//navigation container
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ******* screens ******** //
//Auth Stack
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";
import ForgotPassword from "../screens/Auth/ForgotPassword";

//**Bottom tabs Stack**//
//Search Stack
import SearchDisplay from "../screens/Search/SearchDisplay";
import SearchFilter from "../screens/Search/SearchFilter";
import SearchSuggestion from "../screens/Search/SearchSuggestion";

//RecipeFeed Stack
import RecipeFeedDisplay from "../screens/RecipeFeed/RecipeFeedDisplay";
import RecipeFeedSaveRecipe from "../screens/RecipeFeed/RecipeFeedSaveRecipe";

//Profile Stack
import UserProfile from "../screens/Profile/UserProfile";
import EditProfile from "../screens/Profile/EditProfile";
import OtherUserProfile from "../screens/Profile/OtherUserProfile";

//images
import btmTabIcon2 from "../assets/svg/btm_tab_icon_2";
import btmTabIcon3 from "../assets/svg/btm_tab_icon_3";
import coloredTab3 from "../assets/svg/colored_btm_tab_3";
import coloredTab2 from "../assets/svg/colored_btm_tab_icon_2";
import coloredTabSearch from "../assets/svg/colored_search";
import search from "../assets/svg/search";
import notifs from "../assets/svg/notification";
import msg from "../assets/svg/msg";
import logo from "../assets/svg/logo";
import logoText from "../assets/svg/centered-logo";

//colors
import colors from "../utils/colors";

const appTheme = {
  colors: {
    background: colors.white,
  },
};

const AuthStack = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="login"
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="forgot" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

const RecipeFeedStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="RecipeFeedDisplay">
      <Stack.Screen
        name="RecipeFeedDisplay"
        options={{
          headerTitle: () => (
            <View
              style={{
                width: 100,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <SvgXml xml={logo} />
              <SvgXml xml={logoText} width="100%" />
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                width: 100,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <SvgXml xml={notifs} width="50%" />
              <SvgXml xml={msg} width="50%" />
            </View>
          ),
        }}
        component={RecipeFeedDisplay}
      />
      <Stack.Screen
        name="RecipeFeedSaveRecipe"
        component={RecipeFeedSaveRecipe}
      />
    </Stack.Navigator>
  );
};

const SearchStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="SearchSuggestion">
      <Stack.Screen name="SearchSuggestion" component={SearchSuggestion} />
      <Stack.Screen name="SearchDisplay" component={SearchDisplay} />
      <Stack.Screen name="SearchFilter" component={SearchFilter} />
    </Stack.Navigator>
  );
};

const ProfileStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="UserProfile">
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

const AppTabs = (props) => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarStyle: styles.tabBarStyle, headerShown: false }}
    >
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <SvgXml
              xml={focused ? coloredTabSearch : search}
              width="100%"
              height="100%"
            />
          ),
          tabBarLabel: "",
        }}
      />

      <Tab.Screen
        name="RecipeFeedStack"
        component={RecipeFeedStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <SvgXml
              xml={focused ? coloredTab2 : btmTabIcon2}
              width="100%"
              height="100%"
            />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <SvgXml
              xml={focused ? coloredTab3 : btmTabIcon3}
              width="100%"
              height="100%"
            />
          ),
          tabBarLabel: "",
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
        initialRouteName="Tabs"
      >
        <Stack.Screen name="Tabs" component={AppTabs} />
        <Stack.Screen name="RecipeFeed" component={RecipeFeedStack} />
        <Stack.Screen name="Auth" component={AuthStack} />
        {/* <Stack.Screen name="HomeStack" component={HomeStack} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.white,
  },
});

export default AppNavigator;
