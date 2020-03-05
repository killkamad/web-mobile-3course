import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Button',
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.setState({text:'Alan'})}>
                <Text>{this.state.text}</Text>
            </TouchableOpacity>
        )
    }
}

export default Button;