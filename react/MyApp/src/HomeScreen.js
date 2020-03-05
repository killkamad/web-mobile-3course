import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import List from './List';
import Button from './Button';
import ChuckNorris from "./ChuckNorris";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 0,
        };
    }

    changeScreen() {
        this.setState({screen: 0});
    }

    // changeScreen = () => {
    //     console.log("from list")
    // };

    render() {
        let item;
        if (this.state.screen === 0) {
            item = (<View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.setState({screen: 1})}
                >
                    <Text style={styles.buttonText}>This is my new button</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.setState({screen: 2})}
                >
                    <Text style={styles.buttonText}>See Chuck</Text>
                </TouchableOpacity>
            </View>);
        } else if (this.state.screen === 1) {
            item = <List
                text='This is from Home screen'
                change={() => this.changeScreen()}
            />;
        }else if(this.state.screen === 2){
            item = <ChuckNorris/>
        }
        return (
            <View style={styles.container}>
                {item}
            </View>
        );
    }
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            backgroundColor: '#BABABA',
            borderRadius: 15,
            padding: 10,
            marginLeft: 15,
            marginRight: 15,
        },
        buttonText: {
            fontSize: 24,
            color: 'white',
            fontWeight: 'bold',
        },
    }
);

export default HomeScreen;