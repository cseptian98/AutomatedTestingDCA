import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {TodoLists, User} from 'components'

const Tab = createBottomTabNavigator()

const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="TodoList"
      tabBarOptions={{
        activeTintColor: '#0D47A1',
        style: {
          backgroundColor: '#FFF',
        },
      }}
      backBehavior="history">
      <Tab.Screen
        name="TodoList"
        component={TodoLists}
        initialParams={{url: 'api/TodoLists'}}
        options={{
          tabBarLabel: 'TodoList',
          tabBarIcon: ({color, size}) => (
            <Icon name="playlist-edit" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        initialParams={{url: 'api/User'}}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({color, size}) => (
            <Icon name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeScreen
