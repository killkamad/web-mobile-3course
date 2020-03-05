import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SearchScreen from "./src/screens/SearchScreen";
import ResultShowScreen from "./src/screens/ResultsShowScreen";

const navigator = createStackNavigator({
    Search: SearchScreen,
    ResultsShow: ResultShowScreen,
}, {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
        title: 'Поиск хрючева'
    }
});

export default createAppContainer(navigator);
