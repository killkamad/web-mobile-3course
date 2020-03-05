import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';


const List = props => {
    const students = [
        {name: 'Shyngyz'},
        {name: 'Alan'},
        {name: 'Kirill'},
        {name: 'Daniyar'},
        {name: 'Sasha'},
        {name: 'Aika'},
        {name: 'Ernur'},
    ];
    return (
        <View>
            <Text>{props.text}</Text>
            <TouchableOpacity onPress={() => props.change()}>
                <Text style={styles.button}>Go back</Text>
            </TouchableOpacity>
            <FlatList
                data={students}
                keyExtractor={item => item.name}
                renderItem={({item}) => {
                    return (<Text>{item.name}</Text>);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            // alignItems: 'center',
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

export default List;