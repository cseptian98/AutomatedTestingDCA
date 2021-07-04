import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TodoLists from 'components/TodoLists';
import TodoItems from 'components/TodoItems';
import User from 'components/User';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="TodoList"
      tabBarOptions={{
        activeTintColor: '#424242',
        style: {
          backgroundColor: '#FFD500',
        },
      }}
      backBehavior="history">
      <Tab.Screen
        name="TodoList"
        component={TodoLists}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({color, size}) => (
            <Icon name="playlist-edit" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TodoItems"
        component={TodoItems}
        options={{
          tabBarLabel: 'Item',
          tabBarIcon: ({color, size}) => (
            <Icon name="note-multiple" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({color, size}) => (
            <Icon name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
