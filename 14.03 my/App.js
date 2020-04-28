import * as React from 'react';
import {AsyncStorage, Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const storeData = async (name, phone, email) => {
    try {
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('phone', phone);
        await AsyncStorage.setItem('email', email);
    } catch (error) {
        console.log(error);
    }
    // console.log(name);
    // console.log(phone);
    // console.log(email);
};
// storeData('jojorabit1488','5253523525','killka_m@mail.ru');

const retrieveData = async () => {
    const value = await AsyncStorage.getItem('name');
    const value2 = await AsyncStorage.getItem('phone');
    const value3 = await AsyncStorage.getItem('email');
    const array = [];
    array.push(value);
    array.push(value2);
    array.push(value3);
    alert(array);
    return array
};
// console.log(retrieveData());
// console.log(retrieveData());
    // const da = console.log(phone);
    // return da
// retrieveData();
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
    // const da = console.log(name);
    // return da
};

function Registration({navigation, route}) {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                       underlineColorAndroid="transparent"
                       placeholder="Name"
                       placeholderTextColor="#000000"
                       autoCapitalize="none"
                       value={name}
                       onChangeText={text => setName(text)}
            />
            <TextInput style={styles.input}
                       underlineColorAndroid="transparent"
                       placeholder="Phone"
                       placeholderTextColor="#000000"
                       autoCapitalize="none"
                       value={phone}
                       onChangeText={text => setPhone(text)}
            />
            <TextInput style={styles.input}
                       underlineColorAndroid="transparent"
                       placeholder="Email"
                       placeholderTextColor="#000000"
                       autoCapitalize="none"
                       value={email}
                       onChangeText={text => setEmail(text)}
            />
            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                    storeData(name, phone, email);
                    (name == 'admin') ? navigation.navigate('Admin', {
                        name: name,
                        phone: phone,
                        email: email
                    }) :
                    navigation.navigate('Details', {
                        name: name,
                        phone: phone,
                        email: email
                    })
                }}
            >
                <Text>Submit</Text>
            </TouchableOpacity>
            <Button
                title="show data"
                onPress={() => retrieveData()}
            />
            {/*<Button*/}
            {/*    title="Go to Details"*/}
            {/*    onPress={() => (name == 'admin') ? navigation.navigate('Admin', {*/}
            {/*            name: name,*/}
            {/*            phone: phone,*/}
            {/*            email: email*/}
            {/*        }) :*/}
            {/*        navigation.navigate('Details', {*/}
            {/*            name: name,*/}
            {/*            phone: phone,*/}
            {/*            email: email*/}
            {/*        })*/}
            {/*    }*/}
            {/*/>*/}
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
            <Text>Имя: {retrieveData()[0]}</Text>
            {/*<Text>Телефон: {route.params.phone}</Text>*/}
            {/*<Text>Почта: {route.params.email}</Text>*/}
            {/*<Button*/}
            {/*    title="Go to Home"*/}
            {/*    onPress={() => navigation.navigate('Home')}*/}
            {/*/>*/}
            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

function HomeScreen({navigation, route}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            {/*<Text>Имя: {retrieveData()}</Text>*/}
            <Button
                title="Registration"
                onPress={() => navigation.navigate('Registration')}
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
            {/*<Button*/}
            {/*    title="Go to Home"*/}
            {/*    onPress={() => navigation.navigate('Home')}*/}
            {/*/>*/}
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
                    name="Registration"
                    component={Registration}
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
        backgroundColor: '#22daf4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }
})

export default App;