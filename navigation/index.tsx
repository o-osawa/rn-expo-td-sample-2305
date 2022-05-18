import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import QuizuScreen, {QuizuScreenSetting} from '../screens/QuizScreen';
import DiceScreen, {DiceScreenSetting} from '../screens/DiceScreen';
import JankenScreen, {JankenScreenSetting} from '../screens/JankenScreen';
import SlotScreen, {SloatScreenSetting} from '../screens/SlotScreen';
// import GraphScreen,{GraphScreenSetting} from '../screens/GraphScreen';
// import UiSampleScreen,{UiSampleScreenSetting} from '../screens/UiSampleScreen';
// import HomeworkScreen,{HomeworkScreenSetting} from '../screens/HomeworkScreen';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name={QuizuScreenSetting.screenName}
        component={QuizuScreen}
        options={{
          title: QuizuScreenSetting.title,
          tabBarIcon: ({ color }) => <TabBarIcon name="comment" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={DiceScreenSetting.screenName}
        component={DiceScreen}
        options={{
          title: DiceScreenSetting.title,
          tabBarIcon: ({ color }) => <TabBarIcon name="dot-circle-o" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={JankenScreenSetting.screenName}
        component={JankenScreen}
        options={{
          title: JankenScreenSetting.title,
          tabBarIcon: ({ color }) => <TabBarIcon name="hand-rock-o" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={SloatScreenSetting.screenName}
        component={SlotScreen}
        options={{
          title: SloatScreenSetting.title,
          tabBarIcon: ({ color }) => <TabBarIcon name="arrow-circle-o-down" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}






function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
