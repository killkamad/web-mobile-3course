import React from 'react'
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'

import Movies from '../screens/Movies'
import Confirmation from '../screens/Confirmation'

const AppNavigator = createStackNavigator({
    Home: Movies,
    Confirmation: Confirmation
},
    {
        initialRouteName: "Home"
    })

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer
