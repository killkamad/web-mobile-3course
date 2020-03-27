import * as React from 'react';
import { StatusBar } from 'react-native'
import {Button, View, Text, TextInput, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function HomeScreen({navigation, route}) {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const storeData = async (name, phone, email) => {
        try {
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('phone', phone);
            await AsyncStorage.setItem('email', email);
        } catch (error) {
            console.log(error);
        }
    };

    const retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('name');
            if (value !== null) {
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
            console.log('error');
        }
        const da = console.log(name);
        return da
    };

    const deleteData = async () => {
        try {
            const value = await AsyncStorage.getItem('name');
            if (value !== null) {
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
            console.log('error');
        }
        const da = console.log(name);
        return da
    };
    retrieveData();
    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                       underlineColorAndroid="transparent"
                       placeholder="Name"
                       placeholderTextColor="#000000"
                       autoCapitalize="none"
                       value={name}
                       onChangeText={setName}
            />
            <TextInput style={styles.input}
                       underlineColorAndroid="transparent"
                       placeholder="Phone"
                       placeholderTextColor="#000000"
                       autoCapitalize="none"
                       value={phone}
                       onChangeText={setPhone}
            />
            <TextInput style={styles.input}
                       underlineColorAndroid="transparent"
                       placeholder="Email"
                       placeholderTextColor="#000000"
                       autoCapitalize="none"
                       value={email}
                       onChangeText={setEmail}
            />
            <Button
                title="Submit"
                onPress={() => (name == 'admin') ? navigation.navigate('Admin', {
                        name: name,
                        phone: phone,
                        email: email
                    }) :
                    navigation.navigate('Details', {
                        name: name,
                        phone: phone,
                        email: email
                    })
                }
            />
        </View>
    );
}

const Stack = createStackNavigator();

function DetailsScreen({navigation, route}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>
                Details Screen
            </Text>
            {/*<Text>Имя: {retrieveData()}</Text>*/}
            <Text>Имя: {route.params.name}</Text>
            <Text>Телефон: {route.params.phone}</Text>
            <Text>Почта: {route.params.email}</Text>
            <Button
                title="Go to Details... again"
                onPress={() => navigation.navigate('Details')}
            />
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

function Admin({navigation, route}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text> Admin Screen </Text>
            <Text>Имя: {route.params.name}</Text>
            <Text>Телефон: {route.params.phone}</Text>
            <Text>Почта: {route.params.email}</Text>
            <Button
                title="Go to Details... again"
                onPress={() => navigation.navigate('Details')}
            />
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                />
                <Stack.Screen
                    name="Admin"
                    component={Admin}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        padding: 15,
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }
})

export default App;