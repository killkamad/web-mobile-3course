import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons';

const SearchBar = ({term, onTermChange, onTermSubmit}) => {
    const {container, input, icon} = styles;
    return (
        <View style={container}>
            <Feather
                name='search'
                style={icon}
            />
            <TextInput
                placeholder='Search'
                autoCapitalize='none'
                autoCorrect={false}
                style={input}
                value={term}
                onChangeText={onTermChange}
                onEndEditing={onTermSubmit}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: '#F0EEEE',
        height: 48,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        fontSize: 18,
    },
    icon: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15,
    }
});

export default SearchBar;
