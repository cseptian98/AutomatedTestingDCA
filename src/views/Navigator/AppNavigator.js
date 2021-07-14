import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Login from 'views/Login'
import Home from 'views/Home'
import Register from 'views/Register'

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Automated Testing'}}
      />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}

export default AppNavigator
