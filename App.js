import React from 'react'
import {createAppContainer} from "react-navigation"
import createStackNavigator from "react-native-screens/createNativeStackNavigator"
import HomeScreen from "./src/screens/HomeScreen"
import DetailScreen from "./src/screens/DetailScreen"

const navigator = createStackNavigator({
    Home: HomeScreen,
    Detail: DetailScreen

}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        title: 'Phorest Salon'
    }
})

export default createAppContainer(navigator)
