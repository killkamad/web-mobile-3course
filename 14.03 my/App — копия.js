import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, AsyncStorage} from 'react-native';

//import AsyncStorage from '@react-native-community/async-storage';
import {TextInput} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// сделать дефолтный экран чтоб потом оттуда он уже перенапрявлял в другие (регистр, юзер, админ)
// или мастер в класс переделать, а потом проверить асинхронность

const save = (name, data) => {
    try {
        AsyncStorage.setItem(name, data).then(response => console.log(response)).catch(err => console.log(err));
    } catch (error) {
        // Error retrieving data
        console.log('IN catch', error.message);
    }

};
const get = (name, navigation) => {
    try {
        return AsyncStorage.getItem(name).then(response => {
            response === 'admin' ? navigation.navigate('Admin', {
                name: response,
                phone: 'test',
                email: 'text'
            }) : navigation.navigate('Home')

        }).catch(err => console.log(err));
    } catch (error) {
        // Error retrieving data
        console.log('IN catch', error.message);
    }
};
const del = name => {
    try {
        AsyncStorage.removeItem(name).then(response => console.log(response)).catch(err => console.log(err));
    } catch (error) {
        // Error retrieving data
        console.log('IN catch', error.message);
    }
};


function DefaultScreen({navigation}) {
    get('name', navigation);
    const nameUser = "";

    if (nameUser.toLowerCase() === "admin") {
        navigation.navigate('Admin')
    } else if (nameUser.length > 0) {
        navigation.navigate('Detail')
    } else {
        navigation.navigate('Home')
    }
    return (
        <View><Text> default screen</Text>
        </View>
    )


}

//
function HomeScreen({navigation}) {
    const [nameText, setNameText] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    return (
        <View>
            <Text>Reg Screen</Text>
            <TextInput style={styles.input}
                       label='Name'
                       value={{nameText}}
                       onChangeText={text => setNameText(text)}
            />
            <TextInput style={styles.input}
                       label='Phone'
                       value={{phone}}
                       onChangeText={text => setPhone(text)}
            />
            <TextInput style={styles.input}
                       label='Email'
                       value={{email}}
                       onChangeText={text => setEmail(text)}
            />
            <TouchableOpacity
                style={styles.submitButton}
                onPress={
                    () => {
                        save('name', nameText);
                        save('phone', phone);
                        save('email', email);

                        (nameText.toLowerCase() == "admin") ? navigation.navigate('Admin', {
                                name: nameText,
                                phone: phone,
                                email: email
                            })
                            :
                            navigation.navigate('Detail', {
                                name: nameText,
                                phone: phone,
                                email: email
                            })
                    }
                }
            >
                <Text style={styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
            {/*<Button*/}
            {/*    title="Go to Details"*/}
            {/*    onPress={() => navigation.navigate('Detail')}*/}
            {/*/>*/}
        </View>
    );
};

function DetailsScreen({navigation, route: {params: {name: name, phone: phone, email: email}}}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>User Screen</Text>
            <Text>Name: {name}</Text>
            <Text>Phone: {phone}</Text>
            <Text>Email: {email}</Text>
            <TouchableOpacity onPr
                              Aleksandra Ten
                              ess={() => {
                                  del('name');
                                  del('phone');
                                  del('email');
                                  navigation.navigate('Home')
                              }}>
                <Text style={styles.submitButtonText}> Log out </Text>

            </TouchableOpacity>

        </View>
    );
}

function AdminScreen({navigation, route: {params: {name: name, phone: phone, email: email}}}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Admin Screen</Text>
            <Text>Name: {name}</Text>
            <Text>Phone: {phone}</Text>
            <Text>Email: {email}</Text>
            <TouchableOpacity onPress={() => {
                del('name');
                del('phone');
                del('email');
                navigation.navigate('Home')
            }}>
                <Text style={styles.submitButtonText}> Log out </Text>

            </TouchableOpacity>

        </View>
    );
}

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Default" component={DefaultScreen} options={{title: 'Default'}}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Reg'}}/>
                <Stack.Screen name="Detail" component={DetailsScreen} options={{title: 'User'}}/>
                <Stack.Screen name="Admin" component={AdminScreen} options={{title: 'Admin'}}/>

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
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
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
});