import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

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
import BrowseMyRecipeDisplay from "../screens/BrowseMyRecipe/BrowseMyRecipeDisplay";
import ViewRecipe from "../screens/BrowseMyRecipe/ViewRecipe";

//Profile Stack
import UserProfile from "../screens/Profile/UserProfile";
import EditProfile from "../screens/Profile/EditProfile";
import CookingModeDisplay from "../screens/CookingMode/CookingModeDisplay";
import CookingModeFullScreen from "../screens/CookingMode/CookingModeFullScreen";
import Settings from "../screens/Settings";
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
import settings from "../assets/svg/setting";
import logout from "../assets/svg/signout";
import threeDots from "../assets/svg/three-dots";

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
        name="OtherUserProfile"
        options={{
          headerTitle: () => (
            <Text style={{ color: colors.grey, fontSize: 16 }}>Back</Text>
          ),
          headerRight: () => (
            <SvgXml xml={threeDots} style={{ marginRight: 20 }} />
          ),
        }}
        component={OtherUserProfile}
      />
    </Stack.Navigator>
  );
};

const SearchStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="SearchSuggestion">
      <Stack.Screen
        name="SearchSuggestion"
        options={{ headerShown: false }}
        component={SearchSuggestion}
      />
      <Stack.Screen name="SearchDisplay" component={SearchDisplay} />
      <Stack.Screen name="SearchFilter" component={SearchFilter} />
    </Stack.Navigator>
  );
};

const ProfileStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="UserProfile">
      <Stack.Screen
        name="UserProfile"
        options={{
          headerTitle: "My Kitchen",
          headerRight: () => (
            <TouchableOpacity
              style={{
                width: 60,
                flexDirection: "row",
                alignItems: "center",
                marginRight: 60,
              }}
              onPress={() => props.navigation.navigate("Settings")}
            >
              <SvgXml xml={settings} width="100%" />
              <Text>Settings</Text>
            </TouchableOpacity>
          ),
        }}
        component={UserProfile}
      />
      <Stack.Screen
        options={{
          headerTitle: "Back to My Profile",
          headerTitleStyle: { fontSize: 16, color: colors.grey },
        }}
        name="BrowseMyRecipeDisplay"
        component={BrowseMyRecipeDisplay}
      />
      <Stack.Screen
        name="ViewRecipe"
        options={{ headerShown: false }}
        component={ViewRecipe}
      />
      <Stack.Screen
        name="CookingModeDisplay"
        options={{
          headerTitle: "Back to My Recipes",
          headerTitleStyle: { fontSize: 16, color: colors.grey },
        }}
        component={CookingModeDisplay}
      />
      <Stack.Screen
        name="CookingModeFullScreen"
        options={{ headerShown: false }}
        component={CookingModeFullScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "Back to My Profile",
          headerTitleStyle: { fontSize: 16, color: colors.grey },
        }}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{
          headerTitle: "Back to My Profile",
          headerTitleStyle: { fontSize: 16, color: colors.grey },
          headerRight: () => (
            <TouchableOpacity
              style={{
                width: 60,
                flexDirection: "row",
                alignItems: "center",
                marginRight: 60,
              }}
              onPress={() => console.log("logout")}
            >
              <SvgXml xml={logout} width="100%" />
              <Text>Log Out</Text>
            </TouchableOpacity>
          ),
        }}
        name="Settings"
        component={Settings}
      />
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
