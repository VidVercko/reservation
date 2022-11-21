import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store";

import HomePage from './screens/HomePage';
import AuthNavigator from './navigators/AuthNavigator';
import AppNavigator from './navigators/AppNavigator';

import { colors } from './assets/style';
const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

function AppContainer() {
  React.useEffect(() => {
    StatusBar.setBackgroundColor(colors.dark);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen options={{ headerShown: false }} name="HomePage" component={HomePage} />
          <Stack.Screen options={{ headerShown: false }} name="Auth" component={AuthNavigator} />
          <Stack.Screen options={{ headerShown: false }} name="App" component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)