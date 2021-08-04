/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {HomeScreen, LoginScreen, RegisterScreen} from 'views'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Automated Testing'}}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
