import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TodoLists from '../../components/TodoLists';
import TodoItems from '../../components/TodoItems'
import Weather from '../../components/Weather';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Weather"
      tabBarOptions={{
        activeTintColor: '#212121',
        style: {
          backgroundColor: '#FFD500'
        }
      }}
      backBehavior='history'
    >
      <Tab.Screen
        name="Weather"
        component={Weather}
        options={{
          tabBarLabel: 'Weather',
          tabBarIcon: ({ color, size }) => (
            <Icon name="weather-partly-cloudy" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TodoList"
        component={TodoLists}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color, size }) => (
            <Icon name="playlist-edit" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TodoItems"
        component={TodoItems}
        options={{
          tabBarLabel: 'Item',
          tabBarIcon: ({ color, size }) => (
            <Icon name="note-multiple" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
