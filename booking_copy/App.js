import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
// import { Navigator, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Movies from './src/screens/Movies';
import Confirmation from './src/screens/Confirmation';
import { Router, Scene } from 'react-native-router-flux'
import AppContainer from './src/Navigation/navigation'


import { apiMiddleware, reducer } from './src/redux'
import { applyMiddleware, createStore } from 'redux'

import {Provider} from "react-redux";
const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));


store.dispatch({type: 'GET_MOVIE_DATA'});



export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar>
                    <Scene key='Movies' component={Movies} title='Фильмы' hideNavBar={false} />
                    <Scene key='Confirmation' component={Confirmation} title='Код подтвержден' hideNavBar={false} />
                </Scene>
            </Router>
        );
    }
}

// export default function App()  {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen name="Movies" component={Movies} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

// export default class App extends React.Component {
//     render() {
//         return (
//             <NavigationContainer>
//                 <Stack.Navigator>
//                     <Stack.Screen name="Movies" component={Movies} />
//                     <Stack.Screen name="Confirmation" component={Confirmation} />
//                 </Stack.Navigator>
//             </NavigationContainer>
//         );
//     }
// }



// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import { apiMiddleware, reducer } from './src/redux';
// const store = createStore(reducer, {}, applyMiddleware(apiMiddleware))
//
// store.dispatch({ type: 'GET_MOVIE_DATA' })
//
// export default class App extends React.Component {
//     render() {
//         return (
//             <Provider store={store}>
//                 <NavigationContainer>
//                     <Stack.Navigator>
//                         <Stack.Screen name="Movies" component={Movies} />
//                         <Stack.Screen name="Confirmation" component={Confirmation} />
//                     </Stack.Navigator>
//                 </NavigationContainer>
//             </Provider>
//         )
//     }
// }